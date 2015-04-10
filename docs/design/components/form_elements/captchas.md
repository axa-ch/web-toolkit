#Captcha

Traditional captchas that require the user to decode some characters must be avoided due to accessibility and usability drawbacks.

>images

#Honeypot

Honeypots are hidden form fields that trap spam robots because those robots can't distinguish between shown and hidden form fields. Therefore, a robot will fill the field and therefore fail the test. *Nevertheless* this field should have a clear label which tells users with screen readers to not fill this form.
>Best practice translations
DE: Wenn Sie ein Mensch sind, lassen Sie bitte das nächste Feld leer.
EN: Are you human? If yes, please don't fill anything into the next field.
FR:
IT:

#Timestamps
If honeypots are not enough to stop spammers, consider to measure the time a user needs to fill in the form. If a user requires less than (for example!) 10 seconds to fill 5 fields, it's probably a spam-robot. This technique should be carefully implemented and take prefilling into account, since this can massively speed up a users data entrance.
