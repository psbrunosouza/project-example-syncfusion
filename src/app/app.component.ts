import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import {
  DetailsViewService,
  FileManager,
  MenuClickEventArgs,
  MenuOpenEventArgs,
  NavigationPaneService,
  ToolbarService,
  ViewType
} from '@syncfusion/ej2-angular-filemanager';

import { IDirectoryFileUserPermissions } from '../@core/interfaces/IDirectoryFileUserPermissions';
import { IDirectoryUserPermissions } from '../@core/interfaces/IDirectoryUserPermissions';
import { portuguese } from "../@core/helpers/fileManagerTranslation.helper";

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
    file: ['Open', '|', 'Delete', 'Rename', 'Move', '|', 'SendFile', 'ReviewDocument', 'RelateDocument', 'RequestPublication', '|', 'Details'],
    folder: ['Open', '|', 'NewFolder', 'Rename', 'Delete', 'Move', '|', 'RequestFile', 'NewFile', '|', 'Details'],
    layout: ['SortBy', 'View', 'Refresh', '|', 'NewFolder', 'Upload'],
    visible: true,
  };

  public ngOnInit(): void {
    L10n.load(portuguese);
  }

  ngAfterViewInit(): void {
    // Do Something
  }

  menuClick(args: MenuClickEventArgs) {
    if (!args.fileDetails || !args.fileDetails.length) {
      return;
    }

    if (!args.item || !args.item.text) {
      return;
    }

    const fileDetail = args.fileDetails[0] as any;
    const isFile = fileDetail.isFile;

    if (isFile) {
      this.handleFileActions(fileDetail, args.item.text);
    } else {
      this.handleDirectoryActions(fileDetail, args.item.text);
    }
  }

  handleDirectoryActions(_directory: any, actionTitle: string) {
    const actions: Record<string, () => void> = {
      'Mover': () => alert('Mover Diretório'),
      'Solicitar Arquivo': () => alert('Solicitar Arquivo'),
      'Novo Documento': () => alert('Novo Documento'),
      'Detalhes': () => alert('Detalhes do Diretório'),
    }

    actions[actionTitle]();
  }

  handleFileActions(_file: any, actionTitle: string) {
    const actions: Record<string, () => void> = {
      'Mover': () => alert('Mover Arquivo'),
      'Revisar Documento': () => alert('Revisar Documento'),
      'Relacionar Documento': () => alert('Relacionar Documento'),
      'Solicitar Publicação': () => alert('Solicitar Publicação'),
      'Detalhes': () => alert('Detalhes do Documento'),
    }

    actions[actionTitle]();
  }

  onMenuOpen(args: MenuOpenEventArgs) {
    const isDirectory = args.menuType === 'folder';
    const isFile = args.menuType === 'file';

    if (!args.fileDetails || !args.fileDetails.length) {
      return;
    }

    const fileDetail = args.fileDetails[0] as any;

    if (isDirectory) {
      const permissions = fileDetail.permissions as IDirectoryUserPermissions;

      this.handleDirectoryContextMenuPermissions(permissions);
    } else if (isFile) {
      const permissions = fileDetail.permissions as IDirectoryFileUserPermissions;

      this.handleFileContextMenuPermissions(permissions);
    }
  }

  handleDirectoryContextMenuPermissions(permissions: IDirectoryUserPermissions): void {
    if(!permissions.canCreateDirectoryChild) this.fileManagerInstance.disableMenuItems(["NewFolder"]);
    if(!permissions.canMove) this.fileManagerInstance.disableMenuItems(["Move"]);
    if(!permissions.canEdit) this.fileManagerInstance.disableMenuItems(["Rename"]);
    if(!permissions.canDelete) this.fileManagerInstance.disableMenuItems(["Delete"]);
    if(!permissions.canRequestFile) this.fileManagerInstance.disableMenuItems(["RequestFile"]);
    if(!permissions.canCreateDocument) this.fileManagerInstance.disableMenuItems(["NewFile"]);
  }

  handleFileContextMenuPermissions(permissions: IDirectoryFileUserPermissions): void {
    if(!permissions.canMove) this.fileManagerInstance.disableMenuItems(["Move"]);
    if(!permissions.canEdit) this.fileManagerInstance.disableMenuItems(["Rename"]);
    if(!permissions.canDelete) this.fileManagerInstance.disableMenuItems(["Delete"]);
    if(!permissions.canSendFile) this.fileManagerInstance.disableMenuItems(["SendFile"]);
    if(!permissions.canReviewDocument) this.fileManagerInstance.disableMenuItems(["ReviewDocument"]);
    if(!permissions.canRelateDocuments) this.fileManagerInstance.disableMenuItems(["RelateDocument"]);
    if(!permissions.canRequestPublication) this.fileManagerInstance.disableMenuItems(["RequestPublication"]);
  }

  beforeSend(args: any) {
    args.ajaxSettings.beforeSend = (args: any) => {
      args.httpRequest.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiY29tcGFueSI6eyJpZCI6NTE3NX0sInVzZXIiOnsiaWQiOjk4LCJuYW1lIjoiRWR1YXJkbyBBc3N1bsOnw6NvIn0sImlzTWFzdGVyIjpmYWxzZSwiaXNSZXNhbGUiOmZhbHNlLCJpc0Jhc2UiOnRydWV9LCJpYXQiOjE2NzExMzE1NzcsImV4cCI6MTY3MTE2MDM3N30.5tyUIb_5DGYu9gPvn8IT2bimFTBU-PTmimlp0yDI6ic")
    }
  }

  beforeDownload(args: any): void {
    console.log(args)
  }
}
