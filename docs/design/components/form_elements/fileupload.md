---
title: Fileupload
collection: design_components
template: design.jade
---

The fileupload functionality allows the user to upload images or documents.
The Web Style Guide provides two controls to upload files. The `single-upload`
is designed for use cases where only one document should be uploaded and the
`multi-upload` allows an uncertain amount of documents.

<span class="downloads" >
  <a href="../psd/AXA_forms_desktop.psd" class="downloads__link" >AXA_forms_desktop.psd</a>
  <a href="../psd/AXA_forms_mobile.psd" class="downloads__link" >AXA_forms_mobile.psd</a>
</span>

# Multi and Single Uploads
The multi file upload has a list of files. When you drop a new file over the
dropzone, a new item will be added to the list.
The single file upload on the other hand, replaces the dropzone, with a block
displaying the file properties.

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
Use device detection via the user agent property of the browser to decide whether
to display the dropzone or the button.

# Internet Explorer 9
Internet Explorer 9 does not support drag-and-drop for files. Use a button which
opens the standard file chooser dialog as a fallback.


# Multi Upload Design Example
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

# Single Upload Design Example
The following examples display the three main states of the single upload.


<div class="form">
  <div class="form__group">
    <div class="form__group__label">Datei</div>
    <div class="form__group__control">
      <div class="single-upload">
        <div class="dropzone">
          <div data-dropzone="dropzone" class="dropzone__container">
            <input type="file" class="dropzone__input"/>
            <div class="dropzone__icon-container"><i class="dropzone__icon icon icon--upload"></i></div>
            <div class="dropzone__text-container">
              <div class="dropzone__text"><span>Drag file here or</span>&nbsp;<a class="dropzone__text__upload-link">click to choose</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="form">
  <div class="form__group">
    <div class="form__group__label">Datei (Uploading)</div>
    <div class="form__group__control">
      <div class="single-upload">
        <div class="single-upload__status">
          <div class="single-upload__status__icon-container"><i class="single-upload__status__icon icon icon--upload"></i></div>
          <div class="single-upload__progressbar-container">
            <div class="single-upload__progressbar progressbar">
              <div class="progressbar__description">awesome_image.jpg</div>
              <div class="progressbar__percentage">22%</div>
              <div class="progressbar__progress">
                <div class="progressbar__progress-background">
                  <div style="width: 22%" class="progressbar__progress-foreground"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="form">
  <div class="form__group">
    <div class="form__group__label">Datei (Uploaded)</div>
    <div class="form__group__control">
      <div class="single-upload">
        <div class="single-upload__status">
          <div class="single-upload__status__icon-container"><i class="single-upload__status__icon icon icon--upload"></i></div>
          <div class="single-upload__status__uploaded">
            <div class="single-upload__status__uploaded__actions file-uploaded__actions"><a class="file-uploaded__actions__action">ansehen</a><a class="file-uploaded__actions__action">löschen</a></div>
            <div class="single-upload__status__uploaded__title">axaswitch.gif</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<!-- Copyright AXA Versicherungen AG 2015 -->
