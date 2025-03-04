/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    html,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { StyledButton } from './StyledButton.js';
import buttonStyles from './clear-button.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js';
import crossMediumStyles from '@spectrum-web-components/icon/src/spectrum-icon-cross.css.js';

/**
 * @element sp-clear-button
 *
 * @slot - text label of the Clear Button
 * @slot icon - The icon to use for Clear Button
 */
export class ClearButton extends SizedMixin(StyledButton) {
    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles, crossMediumStyles];
    }

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant: 'overBackground' | '' = '';

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <sp-icon-cross75
                    slot="icon"
                    class="icon spectrum-UIIcon-Cross75"
                ></sp-icon-cross75>
            `,
        ];
    }

    protected render(): TemplateResult {
        return html`
            <div class="fill">${super.render()}</div>
        `;
    }
}
