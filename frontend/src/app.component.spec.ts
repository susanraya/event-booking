import { TestBed } from "@angular/core/testing";
import { Router, provideRouter } from "@angular/router";

import { AppComponent, routes } from "./app.component";

describe("App", () => {
  it("renders a screen inside the app shell and shows its menu", async () => {
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl("/events");
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain("Events");
  });
});
