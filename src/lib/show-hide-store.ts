import { action, observable } from "mobx";

export class ShowHideStore {
  @observable
  public accessor visible: boolean = false;

  @action.bound
  set(value: boolean) {
    this.visible = value;
  }

  toggle = () => {
    this.set(!this.visible);
  };

  hide = () => {
    this.set(false);
  };

  show = () => {
    this.set(true);
  };
}
