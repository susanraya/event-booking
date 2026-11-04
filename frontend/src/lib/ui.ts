/**
 * The component vocabulary generated screens are written against: the Angular twin of the
 * React, Vue and Svelte kits, with the same classes and the same brand variables, so a
 * screen looks the same whichever framework draws it.
 *
 * Angular's own idiom: what is one element in the other kits is a directive on that native
 * element here (`<button uiButton>`, `<div uiCard>`, `<input uiInput [(ngModel)]="...">`),
 * so the element keeps its HTML meaning; what has structure is a small component
 * (`<ui-switch>`, `<ui-tabs>`, `<ui-stat>`, `<ui-empty>`, `<ui-avatar>`, `<ui-icon>`).
 *
 * Inputs and outputs are the decorator kind (`@Input`, `@Output`): the in-browser preview
 * compiles this file just in time, where the signal kind is not recognised.
 */
import { Component, Directive, EventEmitter, Input, Output } from "@angular/core";

import { ICONS } from "./icons";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const BUTTON_VARIANTS: Record<string, string> = {
  primary: "text-white shadow-sm hover:opacity-90",
  secondary: "border bg-white hover:bg-slate-50",
  ghost: "hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const BUTTON_SIZES: Record<string, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

@Directive({
  selector: "[uiButton]",
  host: {
    class:
      "inline-flex items-center justify-center gap-2 rounded-[var(--brand-radius)] font-medium " +
      "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
      "focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 " +
      "disabled:pointer-events-none disabled:opacity-50",
    "[class]": "classes",
    "[style.background-color]": 'variant === "primary" ? "var(--brand-primary)" : null',
  },
})
export class ButtonDirective {
  @Input() variant = "primary";
  @Input() size = "md";
  protected get classes(): string {
    return cx(
      BUTTON_VARIANTS[this.variant] ?? BUTTON_VARIANTS.primary,
      BUTTON_SIZES[this.size] ?? BUTTON_SIZES.md,
    );
  }
}

@Directive({
  selector: "[uiCard]",
  host: { class: "rounded-[var(--brand-radius)] border border-slate-200 bg-white shadow-sm" },
})
export class CardDirective {}

@Directive({
  selector: "[uiCardHeader]",
  host: { class: "flex flex-col gap-1 p-5 pb-3" },
})
export class CardHeaderDirective {}

@Directive({
  selector: "[uiCardTitle]",
  host: { class: "text-base font-semibold tracking-tight text-slate-900", style: "font-family: var(--brand-font-heading)" },
})
export class CardTitleDirective {}

@Directive({
  selector: "[uiCardDescription]",
  host: { class: "text-sm text-slate-500" },
})
export class CardDescriptionDirective {}

@Directive({
  selector: "[uiCardContent]",
  host: { class: "p-5 pt-0" },
})
export class CardContentDirective {}

@Directive({
  selector: "[uiCardFooter]",
  host: { class: "flex items-center gap-2 border-t border-slate-100 p-5" },
})
export class CardFooterDirective {}

@Directive({
  selector: "[uiInput]",
  host: { class: "w-full rounded-[var(--brand-radius)] border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] h-9" },
})
export class InputDirective {}

@Directive({
  selector: "[uiTextarea]",
  host: { class: "w-full rounded-[var(--brand-radius)] border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] min-h-[80px]" },
})
export class TextareaDirective {}

@Directive({
  selector: "[uiSelect]",
  host: { class: "w-full rounded-[var(--brand-radius)] border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)] h-9" },
})
export class SelectDirective {}

@Directive({
  selector: "[uiCheckbox]",
  host: { class: "h-4 w-4 rounded border-slate-300 accent-[var(--brand-primary)]" },
})
export class CheckboxDirective {}

@Directive({
  selector: "[uiLabel]",
  host: { class: "text-sm font-medium text-slate-700" },
})
export class LabelDirective {}

@Directive({
  selector: "[uiTable]",
  host: { class: "w-full border-collapse text-sm" },
})
export class TableDirective {}

@Directive({
  selector: "[uiTHead]",
  host: { class: "border-b border-slate-200" },
})
export class THeadDirective {}

@Directive({
  selector: "[uiTBody]",
  host: { class: "divide-y divide-slate-100" },
})
export class TBodyDirective {}

@Directive({
  selector: "[uiTR]",
  host: { class: "transition-colors hover:bg-slate-50" },
})
export class TRDirective {}

@Directive({
  selector: "[uiTH]",
  host: { class: "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500" },
})
export class THDirective {}

@Directive({
  selector: "[uiTD]",
  host: { class: "px-3 py-2.5 text-slate-700" },
})
export class TDDirective {}

@Directive({
  selector: "[uiSeparator]",
  host: { class: "border-slate-200" },
})
export class SeparatorDirective {}

const BADGE_VARIANTS: Record<string, string> = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  accent: "text-white",
};

@Directive({
  selector: "[uiBadge]",
  host: {
    class: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
    "[class]": "classes",
    "[style.background-color]": 'variant === "accent" ? "var(--brand-accent)" : null',
  },
})
export class BadgeDirective {
  @Input() variant = "default";
  protected get classes(): string {
    return BADGE_VARIANTS[this.variant] ?? BADGE_VARIANTS.default;
  }
}

@Component({
  selector: "ui-switch",
  host: { class: "inline-flex cursor-pointer items-center" },
  template: `
    <label class="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        class="peer sr-only"
        [checked]="checked"
        (change)="toggle($any($event.target).checked)"
      />
      <span
        class="relative h-5 w-9 rounded-full bg-slate-300 transition-colors peer-checked:bg-[var(--brand-primary)]"
        aria-hidden="true"
      >
        <span
          class="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"
        ></span>
      </span>
    </label>
  `,
})
export class SwitchComponent {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  protected toggle(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(checked);
  }
}

@Component({
  selector: "ui-avatar",
  host: {
    class:
      "inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full " +
      "bg-slate-200 text-xs font-medium text-slate-600",
  },
  template: `
    @if (src) {
      <img [src]="src" [alt]="name" class="h-full w-full object-cover" />
    } @else {
      {{ initials }}
    }
  `,
})
export class AvatarComponent {
  @Input() name = "";
  @Input() src?: string;
  protected get initials(): string {
    return this.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }
}

@Component({
  selector: "ui-tabs",
  host: { class: "flex gap-1 border-b border-slate-200" },
  template: `
    @for (tab of tabs; track tab.key) {
      <button type="button" (click)="select(tab.key)" [class]="tab.key === value ? active : idle">
        {{ tab.label }}
      </button>
    }
  `,
})
export class TabsComponent {
  @Input() tabs: Array<{ key: string; label: string }> = [];
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();

  protected select(key: string): void {
    this.value = key;
    this.valueChange.emit(key);
  }

  protected readonly active =
    "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors border-[var(--brand-primary)] text-slate-900";
  protected readonly idle =
    "-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors border-transparent text-slate-500 hover:text-slate-800";
}

@Component({
  selector: "ui-stat",
  host: { class: "block rounded-[var(--brand-radius)] border border-slate-200 bg-white p-4" },
  template: `
    <p class="text-xs font-medium uppercase tracking-wide text-slate-500">{{ label }}</p>
    <p class="mt-1 text-2xl font-semibold text-slate-900" style="font-family: var(--brand-font-heading)">
      {{ value }}
    </p>
    @if (hint) {
      <p class="mt-1 text-xs text-slate-500">{{ hint }}</p>
    }
  `,
})
export class StatComponent {
  @Input({ required: true }) label!: string;
  @Input() value: string | number = "";
  @Input() hint?: string;
}

@Component({
  selector: "ui-empty",
  host: {
    class:
      "flex flex-col items-center justify-center gap-2 rounded-[var(--brand-radius)] " +
      "border border-dashed border-slate-300 px-6 py-12 text-center",
  },
  template: `
    <p class="text-sm font-medium text-slate-900">{{ title }}</p>
    @if (description) {
      <p class="max-w-sm text-sm text-slate-500">{{ description }}</p>
    }
    <ng-content />
  `,
})
export class EmptyComponent {
  @Input({ required: true }) title!: string;
  @Input() description?: string;
}

@Component({
  selector: "ui-icon",
  host: { class: "inline-flex" },
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @for (shape of shapes; track $index) {
        @switch (shape[0]) {
          @case ("path") {
            <svg:path [attr.d]="shape[1]['d']" />
          }
          @case ("circle") {
            <svg:circle [attr.cx]="shape[1]['cx']" [attr.cy]="shape[1]['cy']" [attr.r]="shape[1]['r']" />
          }
          @default {
            <svg:rect
              [attr.x]="shape[1]['x']"
              [attr.y]="shape[1]['y']"
              [attr.width]="shape[1]['width']"
              [attr.height]="shape[1]['height']"
              [attr.rx]="shape[1]['rx']"
            />
          }
        }
      }
    </svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() size = 16;
  protected get shapes() {
    return ICONS[this.name] ?? [];
  }
}

/** Everything a screen may use, for a component's `imports`. */
export const UI_KIT = [
  ButtonDirective,
  CardDirective,
  CardHeaderDirective,
  CardTitleDirective,
  CardDescriptionDirective,
  CardContentDirective,
  CardFooterDirective,
  InputDirective,
  TextareaDirective,
  SelectDirective,
  CheckboxDirective,
  LabelDirective,
  TableDirective,
  THeadDirective,
  TBodyDirective,
  TRDirective,
  THDirective,
  TDDirective,
  SeparatorDirective,
  BadgeDirective,
  SwitchComponent,
  AvatarComponent,
  TabsComponent,
  StatComponent,
  EmptyComponent,
  IconComponent,
] as const;
