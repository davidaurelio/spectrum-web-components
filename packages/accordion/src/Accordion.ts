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
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    queryAssignedNodes,
} from '@spectrum-web-components/base/src/decorators.js';

import { AccordionItem } from './AccordionItem.js';

import styles from './accordion.css.js';
import { Focusable, getActiveElement } from '@spectrum-web-components/shared';

/**
 * @element sp-accordion
 * @slot - The sp-accordion-item children to display.
 */
export class Accordion extends Focusable {
    public static get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Allows multiple accordion items to be opened at the same time
     */
    @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' })
    public allowMultiple = false;

    @queryAssignedNodes()
    private defaultNodes!: NodeListOf<AccordionItem>;

    private get items(): AccordionItem[] {
        return [...(this.defaultNodes || [])].filter(
            (node: HTMLElement) => typeof node.tagName !== 'undefined'
        ) as AccordionItem[];
    }

    public focus(): void {
        if (this.focusElement === this) {
            return;
        }

        super.focus();
    }

    /**
     * @private
     */
    public get focusElement(): Accordion | AccordionItem {
        const items = this.items;
        if (items && !items.length) {
            return this;
        }
        let index = 0;
        while (index < items.length && items[index] && items[index].disabled) {
            index += 1;
        }
        if (items[index]) {
            return items[index];
        }
        /* c8 ignore next */
        return this;
    }

    public startListeningToKeyboard(): void {
        const items = this.items;
        /* c8 ignore next 3 */
        if (items && !items.length) {
            return;
        }
        this.addEventListener('keydown', this.handleKeydown);
    }

    public stopListeningToKeyboard(): void {
        this.removeEventListener('keydown', this.handleKeydown);
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        /* c8 ignore next 3 */
        if (code !== 'ArrowDown' && code !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        const direction = code === 'ArrowDown' ? 1 : -1;
        this.focusItemByOffset(direction);
    }

    private focusItemByOffset(direction: number): void {
        const items = this.items;
        const focused = items.indexOf(getActiveElement(this) as AccordionItem);
        let next = focused;
        let nextItem = items[next];
        // cycle through the available items in the directions of the offset to find the next non-disabled item
        while (nextItem && (nextItem.disabled || next === focused)) {
            next = (items.length + next + direction) % items.length;
            nextItem = items[next];
        }
        // if there are no non-disabled items, skip the work to focus a child
        if (!nextItem || nextItem.disabled || next === focused) {
            return;
        }
        nextItem.focus();
    }

    private async onToggle(event: Event): Promise<void> {
        // Let the event pass through the DOM so that it can be
        // prevented from the outside if a user so desires.
        await 0;
        if (this.allowMultiple || event.defaultPrevented) {
            // No toggling when `allowMultiple` or the user prevents it.
            return;
        }
        const target = event.target as AccordionItem;
        const items = [...this.items] as AccordionItem[];
        /* c8 ignore next 3 */
        if (items && !items.length) {
            // no toggling when there aren't items.
            return;
        }
        items.forEach((item) => {
            if (item !== target) {
                // Close all the items that didn't dispatch the event.
                item.open = false;
            }
        });
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(changed: PropertyValues): void {
        super.firstUpdated(changed);

        this.addEventListener('focusin', this.startListeningToKeyboard);
        this.addEventListener('focusout', this.stopListeningToKeyboard);
        this.addEventListener('sp-accordion-item-toggle', this.onToggle);
    }
}
