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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js';

import toastStyles from './toast.css.js';

export const toastVariants: ToastVariants[] = [
    'negative',
    'positive',
    'info',
    'error',
    'warning',
];

export type ToastVariants =
    | 'negative'
    | 'positive'
    | 'info'
    | 'error'
    | 'warning'
    | '';

/**
 * @element sp-toast
 *
 * @slot - The toast content
 * @slot action - button element surfacing an action in the Toast
 *
 * @fires close - Announces that the Toast has been closed.
 */

export class Toast extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [toastStyles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Number })
    public set timeout(timeout: number | null) {
        const hasTimeout = typeof timeout !== null && (timeout as number) > 0;
        const newTimeout = hasTimeout
            ? Math.max(6000, timeout as number)
            : null;
        const oldValue = this.timeout;
        if (newTimeout && this.countdownStart) {
            this.countdownStart = performance.now();
        }
        this._timeout = newTimeout;
        this.requestUpdate('timeout', oldValue);
    }

    public get timeout(): number | null {
        return this._timeout;
    }

    public _timeout: number | null = null;

    /**
     * The variant applies specific styling when set to `negative`, `positive`, `info`, `error`, or `warning`.
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    @property({ type: String })
    public set variant(variant: ToastVariants) {
        if (variant === this.variant) {
            return;
        }
        const oldValue = this.variant;
        if (toastVariants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }
        this.requestUpdate('variant', oldValue);
    }

    public get variant(): ToastVariants {
        return this._variant;
    }

    private _variant: ToastVariants = '';

    private renderIcon(variant: string): TemplateResult {
        switch (variant) {
            case 'info':
                return html`
                    <sp-icon-info
                        label="Information"
                        class="type"
                    ></sp-icon-info>
                `;
            case 'negative':
            case 'error': // deprecated
            case 'warning': // deprecated
                return html`
                    <sp-icon-alert label="Error" class="type"></sp-icon-alert>
                `;
            case 'positive':
            case 'success': // deprecated
                return html`
                    <sp-icon-checkmark-circle
                        label="Success"
                        class="type"
                    ></sp-icon-checkmark-circle>
                `;
            default:
                return html``;
        }
    }

    private countdownStart = 0;
    private nextCount = -1;

    private doCountdown = (time: number): void => {
        if (!this.countdownStart) {
            this.countdownStart = performance.now();
        }
        if (time - this.countdownStart > (this._timeout as number)) {
            this.open = false;
            this.countdownStart = 0;
        } else {
            this.countdown();
        }
    };

    private countdown = (): void => {
        cancelAnimationFrame(this.nextCount);
        this.nextCount = requestAnimationFrame(this.doCountdown);
    };

    private holdCountdown = (): void => {
        this.stopCountdown();
        this.addEventListener('focusout', this.resumeCountdown);
    };

    private resumeCountdown = (): void => {
        this.removeEventListener('focusout', this.holdCountdown);
        this.countdown();
    };

    private startCountdown(): void {
        this.countdown();
        this.addEventListener('focusin', this.holdCountdown);
    }

    private stopCountdown(): void {
        cancelAnimationFrame(this.nextCount);
        this.countdownStart = 0;
    }

    public close(): void {
        this.open = false;
    }

    protected render(): TemplateResult {
        return html`
            ${this.renderIcon(this.variant)}
            <div class="body" role="alert">
                <div class="content">
                    <slot></slot>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="buttons">
                <sp-clear-button
                    label="Close"
                    variant="overBackground"
                    @click=${this.close}
                ></sp-clear-button>
            </div>
        `;
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('open')) {
            if (this.open) {
                if (this.timeout) {
                    this.startCountdown();
                }
            } else {
                if (this.timeout) {
                    this.stopCountdown();
                }
                const applyDefault = this.dispatchEvent(
                    new CustomEvent('close', {
                        composed: true,
                        bubbles: true,
                        cancelable: true,
                    })
                );
                if (!applyDefault) {
                    this.open = true;
                }
            }
        }
        if (changes.has('timeout')) {
            if (this.timeout !== null && this.open) {
                this.startCountdown();
            } else {
                this.stopCountdown();
            }
        }
    }
}
