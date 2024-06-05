export abstract class ChartDataVariable {
  public name;
  public isHide;

  protected constructor(name: string, isHide: boolean) {
  this.name = name;
    this.isHide = isHide;
  }
}


export class ChartData extends ChartDataVariable {
  constructor(name: string, isHide: boolean = false) {
    super(name, isHide);
  }
}
