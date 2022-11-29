import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  DetailsViewService, FileManager,
  MenuClickEventArgs,
  NavigationPaneService,
  ToolbarService,
  ViewType
} from "@syncfusion/ej2-angular-filemanager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})
export class AppComponent implements OnInit, AfterViewInit{

  @ViewChild('fileManager') fileManagerInstance!: FileManager;
  view: ViewType = "Details"
  ajaxSettings = {
    url: 'https://60bbd2283a39900017b2df38.mockapi.io/cookit/api/v1/files',
    // url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
  };

  contextMenuSettings = {
    file: ['Custom', 'Open', '|', 'Delete', 'Rename', '|', 'Details'],
    folder: ['Custom', 'Open', '|', 'Delete', 'Rename', '|', 'Details'],
    layout: ['Custom', 'SortBy', 'View', 'Refresh', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'],
    visible: true,
  };

  public ngOnInit(): void {
    this.view = "Details";
  }

  ngAfterViewInit(): void {

  }

  menuClick(args: any) {
    if (args.item.text === 'Custom') {
      alert('You have clicked custom menu item')
    }
  }
  menuOpen(args: any){
    this.fileManagerInstance.disableMenuItems(["Custom"]);
  }

  beforeSend(args: any){
    args.setRequestHeader("Authorization","Bearer " + 'token here');
  }
}
