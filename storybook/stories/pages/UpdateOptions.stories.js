/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */

import UpdateOptionsPage from "../../../views/templates/pages/update.html.twig";
import { UpdateOptions as Stepper } from "../components/Stepper.stories";

export default {
  component: UpdateOptionsPage,
  id: "32",
  title: "Pages/Update",
};

export const UpdateOptions = {
  args: {
    // Step
    step: {
      code: "update-options",
      title: "Update options",
    },
    default_deactive_non_native_modules: true,
    default_regenerate_email_templates: true,
    switch_the_theme: 1,
    disable_all_overrides: false,
    step_parent_id: "ua_container",
    stepper_parent_id: "stepper_content",
    // Stepper
    ...Stepper.args,
  },
};
