import { OnInit, Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ServiceLocatorService } from './service-locator.service';
import { HttpServiceService } from './http-service.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from './base.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export class BaseListCtl extends BaseCtl {

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  deleteRecordList: any = [];
  isMasterSel: boolean = false;
  checkList = 0;

  public kl: number;
  constructor(public endpoint, public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(endpoint, locator, route);
    console.log('in base list component')
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    console.log('in base list ng on init')
    this.preload();
    this.search();
    this.isMasterSel = false;
  }

  display() {
    this.search();
  }

  submit() {
    this.form.pageNo = 0;
    this.search();
  }

  delete(id) {
    super.delete(id, function () {
      this.search();
    });
  }


  next() {
    this.form.pageNo++;
    this.isMasterSel = false;
    this.display();
  }

  previous() {
    if (this.form.pageNo > 0) {
      this.form.pageNo--;
      this.isMasterSel = false;
      this.display();

      //this.searchOperation('previous');
    }
  }

  checkUncheckAll(event) {
    console.log('in checkUncheckAl........')
    console.log('checked = ', event.target.checked)
    const checked = event.target.checked;
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = checked
    });
  }

  checklistUpdate() {
    console.log('in checklist update........')
    this.isMasterSel = false;
    this.checkList = 0;
    this.checkboxes.forEach((element) => {
      if (element.nativeElement.checked == true) {
        this.checkList = this.checkList + 1;
      }
    });
    if (this.checkList == this.form.list.length) {
      this.isMasterSel = true;
    }
  }

  deleteMany() {
    console.log('delete Many Records starts ');
    console.log('this.form.pageNo ' + this.form.pageNo);
    this.form.error = false;
    this.deleteRecordList.length = 0;
    console.log('record deleting start ')
    var isRecordSelected: boolean = false;

    this.checkboxes.forEach((element) => {
      if (element.nativeElement.checked) {
        // console.log('record deleting ' + element.nativeElement.id)
        this.deleteRecordList.push(element.nativeElement.id);
        isRecordSelected = true;
      }
    });

    if (isRecordSelected) {
      console.log('record(s) for delete ' + this.deleteRecordList);
      super.deleteMany(this.deleteRecordList + '?pageNo=' + this.form.pageNo, function () {
        //  this.search();  

      });
    } else {
      this.form.message = "Select Atleast One Record";
      this.form.error = true;
      console.log('No record(s) for delete ')
    }
    this.isMasterSel = false;
    console.log('delete Many Records ends ');
  }

}
