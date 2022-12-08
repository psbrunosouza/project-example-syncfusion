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
import {portuguese} from "../@core/helpers/fileManagerTranslation.helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NavigationPaneService, ToolbarService, DetailsViewService]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('fileManager') fileManagerInstance!: FileManager;
  view: ViewType = "LargeIcons"

  locale = 'pt-BR';

  allowMultiSelection = false;

  showThumbnail = false;

  ajaxSettings = {
    url: 'http://localhost:3334/v1/syncfusion/file-manager',
  };

  detailsViewSettings = {
    columns: [
      {
        field: 'name',
        headerText: 'Nome',
        minWidth: 120,
        width: 'auto',
        customAttributes: { class: 'e-fe-grid-name' },
        template: '${name}'
      },
      {
        field: 'code',
        headerText: 'Código',
        minWidth: 50,
        width: 'auto',
        template: '${code}',
      },
      {
        field: 'status',
        headerText: 'Status',
        minWidth: 50,
        width: 'auto',
        template: '${status}',
      },
      {
        field: 'modified_date',
        headerText: 'Última modificação',
        minWidth: 50,
        width: '190',
        template: '${dateModified}',
      }
    ]
  };

  contextMenuSettings = {
    file: ['Custom', 'Open', '|', 'Delete', 'Rename', '|', 'Details'],
    folder: ['Custom', 'Open', '|', 'Delete', 'Rename', '|', 'Details', 'Edit'],
    layout: ['Custom', 'SortBy', 'View', 'Refresh', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'],
    visible: true,
  };

  public ngOnInit(): void {
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
      args.httpRequest.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiY29tcGFueSI6eyJpZCI6NTE3NX0sInVzZXIiOnsiaWQiOjk4LCJuYW1lIjoiRWR1YXJkbyBBc3N1bsOnw6NvIn0sImlzTWFzdGVyIjpmYWxzZSwiaXNSZXNhbGUiOmZhbHNlLCJpc0Jhc2UiOnRydWV9LCJpYXQiOjE2NzA1MDM5NTIsImV4cCI6MTY3MDUzMjc1Mn0.Ch3FpTJfSsjVLMeWTMUBR5mD9WQw9fX9rpisUXoj4Fg")
    }
  }

  beforeDownload(args: any) {
    console.log(args)
  }
}
