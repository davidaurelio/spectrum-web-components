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
    elementUpdated,
    expect,
    fixture,
    html,
    oneEvent,
} from '@open-wc/testing';
import { spy } from 'sinon';

import '../sp-split-button.js';
import { SplitButton } from '..';
import splitButtonDefault, {
    field,
    more,
} from '../stories/split-button-cta.stories.js';
import { MenuItem } from '@spectrum-web-components/menu';
import { TemplateResult } from '@spectrum-web-components/base';
import { sendKeys } from '@web/test-runner-commands';
import type { Button } from '@spectrum-web-components/button';

// wrap in div method

function wrapInDiv(storyArgument: TemplateResult): TemplateResult {
    return html`
        <div>${storyArgument}</div>
    `;
}

const deprecatedMenu = (): TemplateResult => html`
    <sp-menu>
        <sp-menu-item>Option 1</sp-menu-item>
        <sp-menu-item>Option Extended</sp-menu-item>
        <sp-menu-item>Short</sp-menu-item>
    </sp-menu>
`;

describe('Splitbutton', () => {
    it('loads [type="field"] splitbutton accessibly', async () => {
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(field(splitButtonDefault.args))
        );
        const el1 = test.querySelector('sp-split-button') as SplitButton;
        const el2 = test.querySelector('sp-split-button[left]') as SplitButton;

        await elementUpdated(el1);
        await elementUpdated(el2);

        await expect(el1).to.be.accessible();
        await expect(el2).to.be.accessible();
    });
    it('loads [type="field"] splitbutton accessibly with deprecated syntax', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <sp-split-button>${deprecatedMenu()}</sp-split-button>
                <sp-split-button left>${deprecatedMenu()}</sp-split-button>
            </div>
        `);
        const el1 = test.querySelector('sp-split-button') as SplitButton;
        const el2 = test.querySelector('sp-split-button[left]') as SplitButton;

        await elementUpdated(el1);
        await elementUpdated(el2);

        await expect(el1).to.be.accessible();
        await expect(el2).to.be.accessible();
    });
    it('loads [type="more"] splitbutton accessibly', async () => {
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(more({ ...splitButtonDefault.args, ...more.args }))
        );
        const el1 = test.querySelector('sp-split-button') as SplitButton;
        const el2 = test.querySelector('sp-split-button[left]') as SplitButton;

        await elementUpdated(el1);
        await elementUpdated(el2);

        await expect(el1).to.be.accessible();
        await expect(el2).to.be.accessible();
    });
    it('loads [type="more"] splitbutton accessibly with deprecated syntax', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>
                <sp-split-button type="more">
                    ${deprecatedMenu()}
                </sp-split-button>
                <sp-split-button type="more" left>
                    ${deprecatedMenu()}
                </sp-split-button>
            </div>
        `);
        const el1 = test.querySelector('sp-split-button') as SplitButton;
        const el2 = test.querySelector('sp-split-button[left]') as SplitButton;

        await elementUpdated(el1);
        await elementUpdated(el2);

        await expect(el1).to.be.accessible();
        await expect(el2).to.be.accessible();
    });
    it('[type="field"] toggles open/close multiple time', async () => {
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(field(splitButtonDefault.args))
        );
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);
        let items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(3);

        let opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        expect(el.open).to.be.true;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(0);

        let closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;

        expect(el.open).to.be.false;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(3);

        opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        expect(el.open).to.be.true;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(0);

        closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;

        expect(el.open).to.be.false;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(3);
    });
    it('[type="more"] toggles open/close multiple time', async () => {
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(more({ ...splitButtonDefault.args, ...more.args }))
        );
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);
        let items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(3);

        let opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        expect(el.open).to.be.true;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(0);

        let closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;

        expect(el.open).to.be.false;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(3);

        opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        expect(el.open).to.be.true;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(0);

        closed = oneEvent(el, 'sp-closed');
        el.open = false;
        await closed;

        expect(el.open).to.be.false;
        items = el.querySelectorAll('sp-menu-item');
        expect(items.length).to.equal(3);
    });
    it('receives "focus()"', async () => {
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(field(splitButtonDefault.args))
        );
        const el1 = test.querySelector('sp-split-button') as SplitButton;
        const el2 = test.querySelector('sp-split-button[left]') as SplitButton;

        await elementUpdated(el1);
        await elementUpdated(el2);

        el1.focus();
        await elementUpdated(el1);

        expect(document.activeElement).to.equal(el1);
        expect(el1.shadowRoot.activeElement).to.equal(el1.focusElement);

        el2.focus();
        await elementUpdated(el2);

        expect(document.activeElement).to.equal(el2);
        expect(el2.shadowRoot.activeElement).to.equal(el2.focusElement);
    });
    it('[type="field"] manages `selectedItem`', async () => {
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(field(splitButtonDefault.args))
        );
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        expect(el.selectedItem?.itemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const toggleButton = root.querySelector(
            '.trigger'
        ) as HTMLButtonElement;
        const opened = oneEvent(el, 'sp-opened');
        toggleButton.click();
        await opened;

        await elementUpdated(el);

        expect(el.open).to.be.true;

        const closed = oneEvent(el, 'sp-closed');
        item3.click();
        await closed;

        await elementUpdated(el);

        expect(el.selectedItem?.itemText).to.equal('Short');
        expect(el.open).to.be.false;
        expect(document.activeElement).to.equal(el);
        expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
    });
    it('[type="more"] manages `selectedItem.itemText`', async () => {
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(more({ ...splitButtonDefault.args, ...more.args }))
        );
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        expect(el.selectedItem?.itemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const toggleButton = root.querySelector(
            '.trigger'
        ) as HTMLButtonElement;
        const opened = oneEvent(el, 'sp-opened');
        toggleButton.click();
        await opened;

        await elementUpdated(el);

        expect(el.open).to.be.true;

        const closed = oneEvent(el, 'sp-closed');
        item3.click();
        await closed;

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Option 1');
    });
    it('passes click events as [type="field"]', async () => {
        const firstItemSpy = spy();
        const secondItemSpy = spy();
        const thirdItemSpy = spy();
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(
                field(splitButtonDefault.args, {
                    firstItemHandler: (): void => firstItemSpy(),
                    secondItemHandler: (): void => secondItemSpy(),
                    thirdItemHandler: (): void => thirdItemSpy(),
                })
            )
        );
        const el = test.querySelector('sp-split-button') as SplitButton;
        await elementUpdated(el);

        expect(el.selectedItem?.itemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item1 = el.querySelector('sp-menu-item:nth-child(1)') as MenuItem;
        const item2 = el.querySelector('sp-menu-item:nth-child(2)') as MenuItem;
        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const main = el.button;

        main.click();

        await elementUpdated(el);

        expect(firstItemSpy.called, 'first called').to.be.true;
        expect(firstItemSpy.calledOnce, 'first calledOnce').to.be.true;

        const trigger = (el as unknown as { trigger: Button }).trigger;
        let opened = oneEvent(el, 'sp-opened');
        trigger.click();
        await opened;

        await elementUpdated(el);

        expect(el.open, 'open').to.be.true;

        let closed = oneEvent(el, 'sp-closed');
        item3.click();
        await closed;

        await elementUpdated(el);

        expect(el.open, 'not open').to.be.false;
        expect(thirdItemSpy.called, 'third called').to.be.true;
        expect(thirdItemSpy.calledOnce, 'third calledOnce').to.be.true;

        main.click();
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Short');
        expect(thirdItemSpy.called, 'third called, still').to.be.true;
        expect(thirdItemSpy.callCount, 'third callCount').to.equal(2);
        expect(thirdItemSpy.calledTwice, 'third calledTwice').to.be.true;

        await sendKeys({
            press: 'Tab',
        });
        opened = oneEvent(el, 'sp-opened');
        sendKeys({
            press: 'ArrowDown',
        });
        await opened;

        await elementUpdated(el);

        expect(el.open, 'reopened').to.be.true;

        closed = oneEvent(el, 'sp-closed');
        item2.click();
        await closed;

        await elementUpdated(el);

        main.click();

        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Option Extended');
        expect(secondItemSpy.called, 'second called').to.be.true;
        expect(secondItemSpy.calledTwice, 'second twice').to.be.true;

        opened = oneEvent(el, 'sp-opened');
        trigger.click();
        await opened;

        await elementUpdated(el);

        expect(el.open, 'opened again').to.be.true;

        closed = oneEvent(el, 'sp-closed');
        item1.click();
        await closed;
        await elementUpdated(el);

        main.click();

        await elementUpdated(el);

        expect(el.selectedItem?.itemText).to.equal('Option 1');
        expect(firstItemSpy.called, 'first called, sill').to.be.true;
        expect(firstItemSpy.callCount, 'first callCount').to.equal(3);
    });
    it('passes click events as [type="more"]', async () => {
        const firstItemSpy = spy();
        const secondItemSpy = spy();
        const thirdItemSpy = spy();
        const test = await fixture<HTMLDivElement>(
            wrapInDiv(
                more(
                    { ...splitButtonDefault.args, ...more.args },
                    {
                        firstItemHandler: (): void => firstItemSpy(),
                        secondItemHandler: (): void => secondItemSpy(),
                        thirdItemHandler: (): void => thirdItemSpy(),
                    }
                )
            )
        );
        const el = test.querySelector('sp-split-button') as SplitButton;

        await elementUpdated(el);

        expect(el.selectedItem?.itemText).to.equal('Option 1');
        expect(el.open).to.be.false;

        const item2 = el.querySelector('sp-menu-item:nth-child(2)') as MenuItem;
        const item3 = el.querySelector('sp-menu-item:nth-child(3)') as MenuItem;
        const root = el.shadowRoot ? el.shadowRoot : el;
        const main = root.querySelector('#button') as HTMLButtonElement;

        main.click();

        await elementUpdated(el);

        expect(firstItemSpy.called, '1st called').to.be.true;
        expect(firstItemSpy.calledOnce, '1st called once').to.be.true;

        const trigger = root.querySelector('.trigger') as HTMLButtonElement;
        let opened = oneEvent(el, 'sp-opened');
        trigger.click();
        await opened;

        await elementUpdated(el);

        expect(el.open).to.be.true;

        let closed = oneEvent(el, 'sp-closed');
        item3.click();
        await closed;
        await elementUpdated(el);

        expect(el.open, 'not open').to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Option 1');
        expect(thirdItemSpy.called, '3rd called').to.be.true;
        expect(thirdItemSpy.calledOnce, '3rd called once').to.be.true;
        opened = oneEvent(el, 'sp-opened');
        trigger.click();
        await opened;
        await elementUpdated(el);

        expect(el.open).to.be.true;

        closed = oneEvent(el, 'sp-closed');
        item2.click();
        await closed;
        await elementUpdated(el);

        expect(el.open).to.be.false;
        expect(el.selectedItem?.itemText).to.equal('Option 1');
        expect(secondItemSpy.called, '2nd called').to.be.true;
        expect(secondItemSpy.calledOnce, '2nd called once').to.be.true;

        main.click();

        await elementUpdated(el);

        expect(firstItemSpy.called).to.be.true;
        expect(firstItemSpy.calledTwice, '1st called twice').to.be.true;
    });
});
