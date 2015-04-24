---
title: Single Page Applications
template: design.jade
order: 9
---

A single-page application (SPA), is a web application or web site that fits on a single web page with the goal of providing a more fluid user experience akin to a desktop application.

#SEO & Analytics

Indexation of SPA can be difficult for search engines like google or analytics tools like AT Internet due to the underlying techniques of single page applications. Eventhough it is a technical task, discoverability is crucial for users coming from google and co.

#Mobile Performance
Again, a rather technical task - performance on mobile devices may suffer if too many interactions are about to happen on a page. Design thoughtfully and consider adding more interactions for desktops instead of removing them for mobile. Most importantly: Bring it up as early as possible in development.

#Browser Back Button
Single page applications should react to the browser back button as any other website would. Going back should be fast, reliable (data consistency) and not trigger unnecessary animations or effects. Remember: The back button is the single most used button in every webbrowser.

#Refresh & Links
URLs are not automatically updated in single page applications. Additionaly, if a link is shared or a url reloaded, the user expects to get to the current page.

#Instant Feedback
Every actions creates a reaction. Users always need to know if the system is working properly. Feedback to actions should always start max. 0.1 seconds after the user took action (pressed a button for example).

##Load Spinners
Load spinners tell a user that the site is working / loading / rendering or any other action. AXA created a custom spinner which should be used whenever a delay is possible. The text in front of the spinner should be adapted to the action happening. A generic "loading" may not always be the best solution.

#Animations & Transitions
Moving elements are a powerful tool to attract and or waste users’ attention. When designing an animation consider its goal, its frequency of occurrence, and its mechanics.
Employ them sparingly and only when they add meaning to the interaction. Think about whether the animation will cause an attention shift or not and whether the same user is likely to stumble over it again and again. Will the animation reinforce relationships between UI elements? Will users trigger it directly or not? All these aspects matter in the design of a successful animation.

>Checklist Animation
- For an animation to effectively convey a cause-and-effect relationship between UI elements, the effect must begin within 0.1 seconds of the initial user action. This 0.1-second response time maintains the feeling of direct manipulation and supports the perception that the user action caused the new element to appear.
- Slower transitions are less likely to cause an attention shift and are thus less distracting. They are appropriate for animations indirectly triggered by the user or not user initiated in any way. In these situations, the new element should appear with little or no change in position to minimize distraction.
- Fast animations are more likely to attract attention when they happen outside the user’s focus of attention. They are suitable for important elements that users must attend to and act upon.

<!-- Copyright AXA Versicherungen AG 2015 -->
