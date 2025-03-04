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
    waitUntil,
} from '@open-wc/testing';

import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { LitElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { ActionGroup } from '..';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    endEvent,
    homeEvent,
} from '../../../test/testing-helpers';
import { sendKeys } from '@web/test-runner-commands';
import '../sp-action-group.js';

class QuietActionGroup extends LitElement {
    protected render(): TemplateResult {
        return html`
            <sp-action-group quiet>
                <slot name="first"></slot>
                <slot name="second"></slot>
            </sp-action-group>
        `;
    }
}
customElements.define('quiet-action-group', QuietActionGroup);

class EmphasizedActionGroup extends LitElement {
    protected render(): TemplateResult {
        return html`
            <sp-action-group emphasized>
                <slot name="first"></slot>
                <slot name="second"></slot>
            </sp-action-group>
        `;
    }
}
customElements.define('emphasized-action-group', EmphasizedActionGroup);

describe('ActionGroup', () => {
    it('loads empty action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group></sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads default action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group aria-label="Default Group">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal('Default Group');
        expect(el.hasAttribute('role')).to.be.false;
        expect(el.children[0].getAttribute('role')).to.equal('button');
    });
    it('applies `quiet` attribute to its children', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group quiet>
                    <sp-action-button id="first">First</sp-action-button>
                    <sp-action-button id="second">Second</sp-action-button>
                </sp-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `quiet` attribute to its slotted children', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <quiet-action-group>
                    <sp-action-button slot="first" id="first">
                        First
                    </sp-action-button>
                    <sp-action-button slot="second" id="second">
                        Second
                    </sp-action-button>
                </quiet-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `emphasized` attribute to its slotted children', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <emphasized-action-group>
                    <sp-action-button slot="first" id="first">
                        First
                    </sp-action-button>
                    <sp-action-button slot="second" id="second">
                        Second
                    </sp-action-button>
                </emphasized-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('emphasized')).to.be.true;
        expect(firstButton.emphasized).to.be.true;
        expect(secondButton.hasAttribute('emphasized')).to.be.true;
        expect(secondButton.emphasized).to.be.true;
    });
    it('applies `quiet` attribute to slotted children with overlays', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <quiet-action-group>
                    <overlay-trigger slot="first">
                        <sp-action-button slot="trigger" id="first">
                            First
                        </sp-action-button>
                    </overlay-trigger>
                    <overlay-trigger slot="second">
                        <sp-action-button slot="trigger" id="second">
                            Second
                        </sp-action-button>
                    </overlay-trigger>
                </quiet-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('quiet')).to.be.true;
        expect(firstButton.quiet).to.be.true;
        expect(secondButton.hasAttribute('quiet')).to.be.true;
        expect(secondButton.quiet).to.be.true;
    });
    it('applies `emphasized` attribute to slotted children with overlays', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <emphasized-action-group>
                    <overlay-trigger slot="first">
                        <sp-action-button slot="trigger" id="first">
                            First
                        </sp-action-button>
                    </overlay-trigger>
                    <overlay-trigger slot="second">
                        <sp-action-button slot="trigger" id="second">
                            Second
                        </sp-action-button>
                    </overlay-trigger>
                </emphasized-action-group>
            `
        );
        const firstButton = el.querySelector('#first') as ActionButton;
        const secondButton = el.querySelector('#second') as ActionButton;

        await elementUpdated(el);

        expect(firstButton.hasAttribute('emphasized')).to.be.true;
        expect(firstButton.emphasized).to.be.true;
        expect(secondButton.hasAttribute('emphasized')).to.be.true;
        expect(secondButton.emphasized).to.be.true;
    });
    it('loads [selects="single"] action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal('Selects Single Group');
        expect(el.getAttribute('role')).to.equal('radiogroup');
        expect(el.children[0].getAttribute('role')).to.equal('radio');
    });
    it('loads [selects="single"] action-group w/ selection accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [selects="multiple"] action-group accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
        expect(el.getAttribute('aria-label')).to.equal(
            'Selects Multiple Group'
        );
        expect(el.getAttribute('role')).to.equal('group');
        expect(el.children[0].getAttribute('role')).to.equal('checkbox');
    });
    it('loads [selects="multiple"] action-group w/ selection accessibly', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('sets tab stop when [selects="single"] and the initial button is [disabled]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button disabled>First</sp-action-button>
                    <sp-action-button class="second">Second</sp-action-button>
                    <sp-action-button>Third</sp-action-button>
                </sp-action-group>
            `
        );
        const secondButton = el.querySelector('.second') as ActionButton;

        await elementUpdated(el);

        expect(secondButton.hasAttribute('tabindex'));
        expect(secondButton.getAttribute('tabindex')).to.equal('0');
    });
    it('surfaces [selects="single"] selection', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        expect(el.selected, '"Third" selected').to.deep.equal(['Third']);
    });
    it('surfaces [selects="multiple"] selection', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button selected>Third</sp-action-button>
                </sp-action-group>
            `
        );

        await elementUpdated(el);

        expect(el.selected, '"Second" and "Third" selected').to.deep.equal([
            'Second',
            'Third',
        ]);
    });
    it('does not select without [selects]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="No Selects Group">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        thirdElement.click();

        await elementUpdated(el);

        expect(el.selected.length).to.equal(0);
    });
    it('selects via `click` while [selects="single"]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button value="first">First</sp-action-button>
                    <sp-action-button value="second" selected>
                        Second
                    </sp-action-button>
                    <sp-action-button value="third" class="third">
                        Third
                    </sp-action-button>
                </sp-action-group>
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(el.selected.includes('second'));

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected').to.be.true;

        await waitUntil(
            () => el.selected.length === 1 && el.selected.includes('third'),
            'Updates value of `selected`'
        );
    });
    it('selects via `click` while  [selects="multiple"] selection', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Multiple Group"
                    selects="multiple"
                >
                    <sp-action-button selected class="first">
                        First
                    </sp-action-button>
                    <sp-action-button class="second">Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(el.selected.includes('First'));

        firstElement.click();
        secondElement.click();
        thirdElement.click();

        await elementUpdated(el);

        expect(secondElement.selected, 'second child selected').to.be.true;
        expect(thirdElement.selected, 'third child selected').to.be.true;

        await waitUntil(
            () =>
                el.selected.length === 2 &&
                el.selected.includes('Second') &&
                el.selected.includes('Third'),
            'Updates value of `selected`'
        );
    });
    it('does not respond to clicks on itself', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        el.click();

        await elementUpdated(el);

        expect(el.selected.length).to.equal(0);
    });
    it('selection can be prevented', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Single Group"
                    selects="single"
                    @change=${(event: Event): void => {
                        event.preventDefault();
                    }}
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child not selected').to.be.false;
        expect(el.selected.length).to.equal(0);
    });
    const acceptKeyboardInput = async (el: ActionGroup): Promise<void> => {
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Second');

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected').to.be.true;
        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');

        el.dispatchEvent(arrowRightEvent);
        await sendKeys({ press: 'Enter' });

        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('First');

        el.dispatchEvent(arrowLeftEvent);
        el.dispatchEvent(arrowUpEvent);
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Second');

        el.dispatchEvent(endEvent);
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');

        await sendKeys({ press: 'PageUp' });
        await sendKeys({ press: 'Enter' });

        el.dispatchEvent(homeEvent);
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('First');

        el.dispatchEvent(arrowDownEvent);
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Second');
    };
    it('accepts keybord input', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button selected>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        await acceptKeyboardInput(el);
    });
    it('accepts keybord input with tooltip', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group label="Selects Single Group" selects="single">
                    <overlay-trigger>
                        <sp-action-button slot="trigger">
                            First
                        </sp-action-button>
                        <sp-tooltip slot="hover-content">
                            Definitely the first one.
                        </sp-tooltip>
                    </overlay-trigger>
                    <overlay-trigger>
                        <sp-action-button slot="trigger" selected>
                            Second
                        </sp-action-button>
                        <sp-tooltip slot="hover-content">
                            Not the first, not the last.
                        </sp-tooltip>
                    </overlay-trigger>
                    <overlay-trigger>
                        <sp-action-button slot="trigger" class="third">
                            Third
                        </sp-action-button>
                        <sp-tooltip slot="hover-content">Select me.</sp-tooltip>
                    </overlay-trigger>
                </sp-action-group>
            `
        );
        await acceptKeyboardInput(el);
    });
    it('accepts keybord input when [dir="ltr"]', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <sp-action-group
                    label="Selects Single Group"
                    selects="single"
                    dir="ltr"
                >
                    <sp-action-button>First</sp-action-button>
                    <sp-action-button disabled>Second</sp-action-button>
                    <sp-action-button class="third">Third</sp-action-button>
                </sp-action-group>
            `
        );
        const thirdElement = el.querySelector('.third') as ActionButton;

        await elementUpdated(el);
        expect(el.selected.length).to.equal(0);

        thirdElement.click();

        await elementUpdated(el);

        expect(thirdElement.selected, 'third child selected').to.be.true;
        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');

        el.dispatchEvent(arrowRightEvent);
        await sendKeys({ press: 'Enter' });

        await elementUpdated(el);

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('First');

        el.dispatchEvent(arrowUpEvent);
        await sendKeys({ press: 'Enter' });

        expect(el.selected.length).to.equal(1);
        expect(el.selected[0]).to.equal('Third');
    });
    it('accepts "PageUp" and "PageDown"', async () => {
        const el = await fixture<ActionGroup>(
            html`
                <div>
                    <sp-action-group
                        label="Selects Single Group"
                        selects="single"
                    >
                        <sp-action-button>First A</sp-action-button>
                        <sp-action-button class="first">
                            Second A
                        </sp-action-button>
                        <sp-action-button>Third</sp-action-button>
                    </sp-action-group>
                    <sp-action-group
                        label="Selects Single Group"
                        selects="multiple"
                    >
                        <sp-action-button>First B</sp-action-button>
                        <sp-action-button selected class="second">
                            Second B
                        </sp-action-button>
                        <sp-action-button>Third</sp-action-button>
                    </sp-action-group>
                    <sp-action-group></sp-action-group>
                </div>
            `
        );
        const firstElement = el.querySelector('.first') as ActionButton;
        const secondElement = el.querySelector('.second') as ActionButton;

        await elementUpdated(firstElement);
        await elementUpdated(secondElement);

        firstElement.click();

        await sendKeys({ press: 'PageDown' });
        let activeElement = document.activeElement as ActionButton;
        expect(activeElement).equal(secondElement);

        await sendKeys({ press: 'PageUp' });
        activeElement = document.activeElement as ActionButton;
        expect(activeElement).to.equal(firstElement);

        await sendKeys({ press: 'PageUp' });
        activeElement = document.activeElement as ActionButton;
        expect(activeElement).to.equal(secondElement);

        await sendKeys({ press: 'PageDown' });
        activeElement = document.activeElement as ActionButton;
        expect(activeElement).to.equal(firstElement);
    });
});
