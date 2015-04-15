---
title: Fileupload
collection: design_components
template: design.jade
---

The fileupload functionality allows the user to upload images or documents.
The Web Style Guide provides two controls to upload files. The `single-upload`
is designed for use cases where only one document should be uploaded and the
`multi-upload` allows an uncertain amount of documents.

# Restrictions and Errors
Tell the user upfront, what file types, file endings and document sizes are allowed.
In case of errors, make sure you're message is as precise as possible, so the
user knows, if he can try uploading the same file again, or not.

# Instant Upload
Don't wait to upload the files until the user submits the form as this causes
the submit action to take a long time.
Instead start uploading files, as soon as the user selects them. Display progress
and allow them to be removed.
But make sure all files are uploaded before the user can submit the form.

# Mobile
The default file upload control uses a dropzone to support drag-and-drop.
Most mobile devices don't have file explorers you can use to drag files to a
website.
Display a button which opens the standard file chooser dialog as a fallback.

# Internet Explorer 9
Internet Explorer 9 does not support drag-and-drop for files. Use a button which
opens the standard file chooser dialog as a fallback.


# Multi Upload Example
<div class="l-container">
  <div class="form">
    <div class="form__group">
      <div class="form__group__label">Datei</div>
      <div class="form__group__control">
        <div class="multi-upload">
          <div class="dropzone">
            <div data-dropzone="dropzone" class="dropzone__container">
              <input type="file" class="dropzone__input"/>
              <div class="dropzone__icon-container"><i class="dropzone__icon icon icon--upload"></i></div>
              <div class="dropzone__text-container">
                <div class="dropzone__text"><span>Drag file here or</span>&nbsp;<a class="dropzone__text__upload-link">click to choose</a></div>
              </div>
            </div>
          </div>
          <div class="multi-upload__remarks">Nur Bilder (.jpg, .png, .gif) oder Dokumente (.pdf, .docx).<br/>Maximal 2 MB pro Datei</div>
          <div class="file-list">
            <div class="file-list__file">
              <div class="progressbar">
                <!-- <div class="progressbar__description">awesome_image.jpg</div> -->
                <div class="progressbar__description">hello-world.gif</div>
                <div class="progressbar__percentage">22%</div>
                <div class="progressbar__progress">
                  <div class="progressbar__progress-background">
                    <div style="width: 22%" class="progressbar__progress-foreground"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="file-list__file">
              <div class="file-uploaded">
                <div class="file-uploaded__actions"><a class="file-uploaded__actions__action">ansehen</a><a class="file-uploaded__actions__action">löschen</a></div>
                <div class="file-uploaded__title">axaswitch.gif</div>
              </div>
            </div>
            <div class="file-list__file">
              <div class="file-uploaded">
                <div class="file-uploaded__actions"><a class="file-uploaded__actions__action">ansehen</a><a class="file-uploaded__actions__action">löschen</a></div>
                <div class="file-uploaded__title">superblock.jpg</div>
              </div>
            </div>
            <div class="file-list__file">
              <div class="file-error">
                <div class="file-error__progressbar progressbar">
                  <div class="progressbar__description">awesome_image.jpg</div>
                  <div class="progressbar__error"><a class="progressbar__error-icon icon icon--modal-close"></a></div>
                  <div class="progressbar__progress">
                    <div class="progressbar__progress-error"></div>
                  </div>
                </div>
                <div class="file-error__message">
                  Die Datei konnte nicht hochgeladen werden.
                  Bitte löschen Sie sie aus der Liste und laden sie erneut hoch.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form__group">
      <div class="form__group__label">Fallback button</div>
      <div class="form__group__control">
        <div class="multi-upload">
          <div class="dropzone-fallback">
            <input type="file" class="dropzone-fallback__input"/><a class="dropzone-fallback__button button button--primary"><i class="dropzone-fallback__button__icon icon icon--upload"></i><span class="dropzone-fallback__button__text">Click to upload files</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- # TODO: Design Specs
Coming soon -->


<!--

# Draft
- Communicate restrictions
  - File endings/types
  - File size
- Display current uploaded file
  - Image preview?
  - Document dowload
- Multiple Files (communicate clearly)
- "Instant-Upload"
  - Allows (server side) validation
  - Upload progress
  - Blocks form submit
  - "Delete" files
- Image crop
- Validate
  - File endings on client and server side
  - File size on client and server side
  - File contents on server side (maleware, valid image/rar/zip/whatever)
- Allow for drag'n'drop
-
- Fallback for older browsers?
  - Progressive enhancement
-->
<!-- Copyright AXA Versicherungen AG 2015 -->
