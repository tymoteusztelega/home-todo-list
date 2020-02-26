import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[capsLock]' })
export class DetectCapsLockDirective {
  @Output('capsLock') capsLock = new EventEmitter<Boolean>();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    console.log(document);
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    console.log(document);
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    this.capsLock.emit(capsOn);
  }
}
