import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  AjaxSettings,
  DetailsViewService, FileManager,
  MenuClickEventArgs,
  NavigationPaneService,
  ToolbarService,
  ViewType
} from "@syncfusion/ej2-angular-filemanager";
import { L10n } from '@syncfusion/ej2-base';
import {portuguese} from "../@core/helpers/translation.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NavigationPaneService, ToolbarService, DetailsViewService]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('fileManager') fileManagerInstance!: FileManager;
  view: ViewType = "Details"

  locale = 'pt-BR';

  ajaxSettings = {
    // url: 'https://60bbd2283a39900017b2df38.mockapi.io/cookit/api/v1/files',
    // url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    url: 'http://localhost:3334/v1/syncfusion/file-manager',
  };

  contextMenuSettings = {
    file: ['Custom', 'Open', '|', 'Delete', 'Rename', '|', 'Details'],
    folder: ['Custom', 'Open', '|', 'Delete', 'Rename', '|', 'Details', 'Edit'],
    layout: ['Custom', 'SortBy', 'View', 'Refresh', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'],
    visible: true,
  };

  public ngOnInit(): void {
    this.view = "Details";
    L10n.load(portuguese);
  }

  ngAfterViewInit(): void {

  }

  menuClick(args: any) {
    if (args.item.text === 'Custom') {
      alert('You have clicked custom menu item')
    }

    if (args.item.text === 'Edit') {
      console.log(args);

      alert('You have clicked edit menu item')
    }
  }

  menuOpen(args: any) {
    this.fileManagerInstance.disableMenuItems(["Custom"]);
  }

  beforeSend(args: any) {
    console.log(args.ajaxSettings)
    args.ajaxSettings.beforeSend = (args: any) => {
      //Setting authorization header
      args.httpRequest.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiY29tcGFueSI6eyJpZCI6NTE3NX0sInVzZXIiOnsiaWQiOjk4LCJuYW1lIjoiRWR1YXJkbyBBc3N1bsOnw6NvIn0sImlzTWFzdGVyIjpmYWxzZSwiaXNSZXNhbGUiOmZhbHNlLCJpc0Jhc2UiOnRydWV9LCJpYXQiOjE2NzAyNTI1NjMsImV4cCI6MTY3MDI4MTM2M30.wQ6YgHiCcJWdHX9mSFIrAtXWd1ezNH5SixikBLz4aFo")
    }
  }

  beforeDownload(args: any) {
    console.log(args)
  }
}
