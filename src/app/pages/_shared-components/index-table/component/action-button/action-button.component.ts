import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ngx-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements OnInit {
    @Input() variableName: any;
    @Input() variableFromObject: any;
    @Input() hiddenFunction: Function;
    @Input() icon: string = 'nb-search';
    @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();

    hiddenStatus: boolean = false;

    constructor() {
    }

    ngOnInit() {
        if (this.hiddenFunction != null) {
            if (this.variableName != null) {
                if (this.variableFromObject != null) {
                    const value = this.getValue(this.variableFromObject);
                    const hiddenFunction = this.hiddenFunction(value);
                    if (typeof hiddenFunction != 'undefined' && typeof hiddenFunction == 'boolean') {
                        this.hiddenStatus = hiddenFunction;
                    }
                }
            }
        }
    }

    onClick(data: any) {
        this.eventEmitter.emit(data);
    }

    getValue(data): string {
        const variableTarget = this.variableName.split('.');
        let variableDataGlobal = null;
        if (variableTarget.length >= 1) {
            if (variableTarget[0] == 'all' || variableTarget[0] == '') {
                variableDataGlobal = data;
            } else {
                let variableData: any = data[variableTarget[0]];
                for (let x = 1; x < variableTarget.length; x++) {
                    variableData = variableData[variableTarget[x]];
                }
                variableDataGlobal = variableData;
            }
        }
        return variableDataGlobal;
    }
}

interface ActionButtonInterface {
    variableName: string;
    hiddenFunction: Function;
    icon: string;

    onClick(data): void;
}

export class ActionButton implements ActionButtonInterface {
    variableName: string;
    icon: string;
    hiddenFunction: Function;
    output: EventEmitter<any> = new EventEmitter<any>();

    constructor(variableName: string, icon: string = 'nb-search', hiddenFunction: Function = null) {
        this.variableName = variableName;
        this.hiddenFunction = hiddenFunction;
        this.icon = icon;
    }

    onClick(data): void {
        const variableTarget = this.variableName.split('.');
        let variableDataGlobal = null;
        if (variableTarget.length >= 1) {
            if (variableTarget[0] == 'all' || variableTarget[0] == '') {
                variableDataGlobal = data;
            } else {
                let variableData: any = data[variableTarget[0]];
                for (let x = 1; x < variableTarget.length; x++) {
                    variableData = variableData[variableTarget[x]];
                }
                variableDataGlobal = variableData;
            }
        }
        this.output.emit(variableDataGlobal);
    }
}
