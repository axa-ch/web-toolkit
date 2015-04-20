---
title: Form Design
template: design.jade
order: 1
---
Try to find someone who likes filling forms, you won't. This is the reason why we built this guide on how to build forms for AXA. We included checklist for most topics, which give you a deeper insight and valuable tipps on how to build less annoying forms.

>Checklist: Form Basics
- What are your users’ needs and how will they use the form?
- Collect data from usability tests, customer support records, web analytics and learn about web conventions.
- Be clear what success is and how you will measure it.

#Form structure

The architectural structure of a form is crucial for its user experience.

###Form Design Principles

Building upon the general design principles, there are some more principles we consider important for designing forms.

###Minimize the pain

The process of completing a form should be as simple and easy as possible. Take time to remove every question that is not absolutely necessary to ask. If you have optional questions, ask them, when the form is already completed.

###Illuminate a Path to Completion

People don’t want to fill in a form, they want to reach a goal, e.g. to receive compensation for their stolen phone. Make it clear how people can accomplish that goal.

###Consider the Context

Forms rarely exist in a vacuum. They are almost always part of a broader context (audience, application, business), which informs how they’ll be used.

###Ensure Consistent Communication:

Forms are conversations between customers and companies. Therefore ask clear and short questions in a natural language. Speak with one voice, despite questions from different people or departments.

##Form Organisation

Organize your form as a conversation, use natural breaks and group related questions.
Use the minimal amount of visual information to distinguish different content groups. Avoid visual clutter and don't interrupt scan lines.

>Checklist: Form Principles & Organisation
- Remove unnecessary questions.
- few short topics > one page
- few topics with large number of questions > multiple pages
- one topic with large number of questions > one page
- Use the minimal amount of visual information to distinguish different content groups.
- Avoid visual clutter and don't interrupt scan lines.
- Speak with one voice, despite questions from different people or departments.

##Path to completion
A straight path to completion is important for an efficient form filling process. Especially complex forms, thinking about claims, require proper guidance. This guidance depends on a superb navigation, clear scan lines as well as an well-organized form.
On long & paginated forms, an introductory page may be used to give upfront information about the form to follow.

>Checklist: Path to completion
- On desktop, right align labels because this allows easier scanning and filling of the form.
- On mobile, put the labels above the form element because horizontal space is limited and scanning stays very easy.
- Provide a meaningful title for every form because users need to know they are at the right place
- Remove anything from the site that could distract the user, because forms (especially when it comes to claims) are no easy task. The user needs support to concentrate.
- Introductory pages are useful for long forms. Use them to tell the user about:
-- How long does is approx. take to fill in this form
-- Does the user need any special information or documents he can prepare?
- Set the right tab-order to enable fast input because great UX is in the details.

#Form interaction

similar

##Inline Validation
Sometimes, a lot of answers to a question are possible and we even need it in a certain format. This is when inline validation steps in.
Inline validation can provide several types of feedback: confirmation that an appropriate answer was given, suggestions for valid answers, and real-time updates designed to help people stay within necessary limits. These bits of feedback usually happen when people begin, continue, or stop entering answers within input fields.

>**Inline Validation Checklist**
- Consider using inline validation to confirm or
suggest valid answers and to help people stay
within limits.
- Inline confirmation works best for questions with
potentially high error rates or specific formatting
requirements.
- Inline suggestions work best when there is a
large set of valid answers people can pick from.
- Inline quality indicators can guide people to
better answers to complex questions.
- When validating people’s answers inline, do so
after they have finished providing an answer, not
during the process.
- If you need to change people’s responses into a
specific format, make sure you do so after they
have finished providing an answer, not during
the process.
- When input limits exist, communicate their
boundaries using real-time, dynamic updates.

###Confirmation

As many inputs as possible should be validated as soon as the user left the input field. Never validate while the user is still entering information. A good validation example is to check if a username is still available or if the email adress has been used before.
>GIF einfügen

###Suggestions

If a user has to enter a specific but already known value, an autocomplete suggest functions helps the user to complete his goal. Suggestions should always be designed to fit the usecase but there should never be more than 10 results at a time shown to the user to avoid confusion. Instead, give him the option to show all results.

###Limits

If there is a limit to the length of a text field or area and the user is likely to exceed, give him a hint.

#Form elements

When it comes to form elements, we follow the touch-first principle. Inputs which require a keyboard should always be chosen last, because text inputs are a burden for many users.
For a list of items please see the [form elements](/design/components/form_elements) in the [components](/design/components/) section

>**Checklist: form elements**
- Inputs which require a keyboard should always be the last option  
- Stay on Keypad: condense UI where appropriate
- Skip Steps: get people into input mode asap

##Errors

The best way to handle errors, is not to allow them in the first place. This said, users should always get timely and approximate feedback on their input. Unresolved problems hinder the user to complete the form and therefore should be placed prominently.
Error-messages itself should always be friendly and give clear directions on how to resolve the problem. The mistake is usually made by us and not the user, because we designed the system which led him to failure: never blame the user.

>Checklist: Errors
- Put error messages below the field that they occurred because the user needs context.
- Use colour and other graphic elements to make error messages visible. Never forget about colour-blind people or users with black and white screens.
- Provide clear explanations instead of a generic “An error occurred”. Because if you don’t help them properly, users will make the same mistake again.


#Example

A best practice form as described on this site is available on the [example section of the styleguide](#).

#Source

Most research conducted lead one way or another to the book Web Form Design by Luke Wroblewski. This book is highly recommended as an deep-dive on web forms.
<!-- Copyright AXA Versicherungen AG 2015 -->
