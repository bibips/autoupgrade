import {
    // Import utils
    testContext,
    // Import BO pages
    boDashboardPage,
    boLoginPage,
    boOrdersPage,
    // Import data
    dataOrderStatuses,
} from '@prestashop-core/ui-testing';

import {test, expect, Page, BrowserContext} from '@playwright/test';

const baseContext: string = 'sanity_ordersBO_filterOrders';

/*
  Connect to the BO
  Filter the Orders table
  Logout from the BO
 */
test.describe('BO - Orders - Orders : Filter the Orders table by ID, REFERENCE, STATUS', () => {
    let browserContext: BrowserContext;
    let page: Page;
    let numberOfOrders: number;

    test.beforeAll(async ({browser}) => {
        browserContext = await browser.newContext();
        page = await browserContext.newPage();
    });
    test.afterAll(async () => {
        await page.close();
    });

    // Steps
    test('should login in BO', async () => {
        await testContext.addContextItem(test.info(), 'testIdentifier', 'loginBO', baseContext);

        await boLoginPage.goTo(page, global.BO.URL);
        await boLoginPage.successLogin(page, global.BO.EMAIL, global.BO.PASSWD);

        const pageTitle = await boDashboardPage.getPageTitle(page);
        expect(pageTitle).toContain(boDashboardPage.pageTitle);
    });

    test('should go to the \'Orders > Orders\' page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage', baseContext);

        await boDashboardPage.goToSubMenu(
            page,
            boDashboardPage.ordersParentLink,
            boDashboardPage.ordersLink,
        );

        const pageTitle = await boOrdersPage.getPageTitle(page);
        await expect(pageTitle).toContain(boOrdersPage.pageTitle);
    });

    test('should reset all filters and get number of orders', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'resetFilters1', baseContext);

        numberOfOrders = await boOrdersPage.resetAndGetNumberOfLines(page);
        await expect(numberOfOrders).toBeGreaterThan(0);
    });

    const tests = [
        {
            args:
                {
                    identifier: 'filterId',
                    filterType: 'input',
                    filterBy: 'id_order',
                    filterValue: 1,
                },
        },
        {
            args:
                {
                    identifier: 'filterReference',
                    filterType: 'input',
                    filterBy: 'reference',
                    filterValue: 'FFATNOMMJ',
                },
        },
        {
            args:
                {
                    identifier: 'filterOsName',
                    filterType: 'select',
                    filterBy: 'osname',
                    filterValue: dataOrderStatuses.paymentError,
                },
        },
    ];

    tests.forEach((tst) => {
        test(`should filter the Orders table by '${tst.args.filterBy}' and check the result`, async function () {
            await testContext.addContextItem(this, 'testIdentifier', `filterOrders_${tst.args.identifier}`, baseContext);

            await boOrdersPage.filterOrders(
                page,
                tst.args.filterType,
                tst.args.filterBy,
                tst.args.filterValue,
            );

            const textColumn = await boOrdersPage.getTextColumn(page, tst.args.filterBy, 1);
            await expect(textColumn).toEqual(tst.args.filterValue);
        });

        test('should reset all filters', async function () {
            await testContext.addContextItem(this, 'testIdentifier', `resetFilters_${tst.args.identifier}`, baseContext);

            const numberOfOrdersAfterReset = await boOrdersPage.resetAndGetNumberOfLines(page);
            await expect(numberOfOrdersAfterReset).toEqual(numberOfOrders);
        });
    });

    // Logout from BO
    test('should log out from BO', async function () {
        await testContext.addContextItem(test.info(), 'testIdentifier', 'logoutBO', baseContext);

        await boLoginPage.logoutBO(this);

        const pageTitle = await boLoginPage.getPageTitle(page);
        expect(pageTitle).toContain(boLoginPage.pageTitle);
    });
});
