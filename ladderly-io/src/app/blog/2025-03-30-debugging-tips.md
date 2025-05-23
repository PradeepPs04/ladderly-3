---
title: '24. Debugging Tips'
author: John Vandivier
---

There are loads of ways for software engineers to debug.

This article describes four groups of tips and gives special notes focusing on commercial patterns and debugging in the interview.

These debugging tips overlap with remediation, testing, and other practices.

## Seven Core Search Techniques

Search techniques are foundational skills upstream of all technical and soft skill acquisition.

In this section, we quickly review a prioritized list of search techniques to enable immediate action. Later techniques will dive deeper.
You can also refer to [this video](https://www.youtube.com/live/J2-BF64-sGQ) for over an hour of content on this topic, diving deeper into each of the seven techniques with timestamps in the video description.

For commercial debugging in particular, be sure to read the `Commercial Patterns` section which also cuts across groups with a focus on industry norms.

Before I give you the seven search techniques, here are seven general usage tips in a debugging use case:

1. I recommend time boxing each solution attempt to five minutes. If you are making progress, continue on for another five minutes with the same technique. If you are not making progress, switch techniques.
2. Keep notes as you go. These notes can be a source of relevant context for AI tools and humans.
3. As you record notes, leverage analytical thinking skills to try and uncover a root cause. If you can confidently identify a root cause and solve it, you can eliminate worry that a code change may have simply hidden or moved the issue.
4. Besides technical facts, suspicions are also useful notes.
5. If you discover a critical piece of context, feel free to circle back to the top of the list.
6. Leverage version control with lots of small commits. If you observe an error change, it may not be immediately obvious whether you have solved the initial error and found a subsequent error, or perhaps a code change introduced a new error. Lots of small commits help you understand what happened and backtrack as needed.
7. Once you have solved an issue, consider implementing tests, types, or other automated checks to prevent similar issues from occuring in the future.

The seven core techniques are:

1. Generative Search, using an AI tool.
   1. This might include sending text or images to a tool like Cursor Composer or ChatGPT, with or without web search grounding.
   2. Ladderly.io also has an AI agent you can use which is pretrained on our own practices and opinions.
2. Reference code.
   1. If you have access to a code repository where someone implemented a similar solution, review their implementation. Maybe this is something you did in a prior repository!
   2. There may be a solution in a similar component or test in the codebase under issue. Try searching around the codebase to see whether similar code exists elsewhere without issue.
   3. If you don't have reference code on hand, good references can be found through the other search techniques.
3. Boolean and Keyword Search, also called Googling
   1. Make use of boolean operators and expressions such as exact match on an error message
   2. Trim down logs to the essential keywords and key phrases
4. Read the official documentation for the libraries and APIs you are using
5. Reading trusted third-party sources. This can include sources like Mozilla, highly voted Stack Overflow answers, and reputable blogs which often vary by domain, such as [CSS-Tricks](https://css-tricks.com/).
6. Guess and Check
   1. Try to locally reproduce the issue then use print statements, breakpoints, intuition, and intellisense to try out solving the issue
   2. Automated tests like unit tests are a great way to give you confidence that your solution works and does not introduce unexpected regressions. Other automated checks like type checking can also help.
   3. Tests not only catch issues, but they also act as documentation and debugging tools. Review tests that seem related to your issue and consider modifying them to give you insight into the root cause of the issues you are observing.
7. Social Escalation and Consultation. You can escalate to a coworker, a social network member, or post a question on a site like Stack Overflow.

## Bug Prevention

Prevention is the best medicine. Techniques to prevent bugs include:

1. Use types. This includes prefering a strong DB schema over a dynamic schema as an intelligent default.
2. Use automated tests
3. Include verification requirements alongside feature requirements. This is similar to the idea of test-driven development, though Ladderly.io doesn't require you write the test before the implementation code.
4. Prefer standard stacks, libraries, and conventions. This will give you more access to relevant documentation, reference code, AI tool performance, and support as you develop, whether or not you run into bugs.
5. Use code formatters, linters, and readable code.
6. Try to keep your local environment as similar to production as possible and use an isolated staging environment.
   1. This will allow you to reproduce production issues and fixes without mutating the production environment itself.
   2. The [Twelve-Factor App](https://12factor.net/) is a good mental model to reinforce this point
   3. Configuration as code and infrastructure as code are useful practices for this
7. Leverage database backups and consider whether your software solution can easily integrate database branching as a development workflow.
8. If possible, implement a high-quality peer review system.
   1. This article won't dive deep on this point, but even as a solo developer you can consider getting an AI code review tool

Preventing bugs also overlaps with general principles of high-quality software development and system design. Ladderly.io describes a broad set of quality principles in the mnemonic [CUTE TYPE HAM](/blog/2025-04-06-code-quality-as-ham).

AI-Driven development, or vibe coding, presents a unique set of opportunities and problems worth their own direct discussion on prevention and remediation. Be sure to review [35. Code Smarter, Not Harder: Your Guide to Vibe Coding](/blog/2025-05-10-vibe-coding-genius) on exactly this topic.

## Code-Based Debugging

Here are eleven debugging tips using code tools and techniques:

1. Logging and Alerting
   1. Logging is a general term which includes client-side logs, server-side logs, remote commercial loggers, and so on.
   2. Alerting in a web app is like logging, except you call the [alert()](https://www.w3schools.com/jsref/met_win_alert.asp) function which causes a popup in the UI to present alerted text, which will be visible even without opening the [browser's developer tools](https://developer.chrome.com/docs/devtools).
2. Breakpoints. You can use breakpoint keywords, such as `debugger` in JavaScript, or IDE-based breakpoints.
3. In-memory debugging, or attaching to a running process. [Here's how to do this with the Chrome Remote Debugger](https://developers.google.com/cast/docs/debugging/remote_debugger)
4. Launching a wrapped process
   1. This is a common pattern for use in conjuction with an IDE.
   2. Here's how to do this [with Python and VS Code](http://code.visualstudio.com/docs/python/debugging)
5. Elimination-Based Debugging
   1. You can stub, mock, comment, or replace sections of code in order to isolate the root cause of a bug from a process flow perspective.
   2. For instance, if a FruitTree component wraps an Apple component, you can try commenting out the Apple component, or replacing with a trivial "hello world" paragraph, in order to see if the issue remains. If it does, the Apple component can't be the root cause by process of elimination.
6. Element Substitution
   1. This is a special case of elimination-based debugging which works especially well for rendered media like web pages, games, and audio output.
   2. Work backwards from the final rendering code and substitute in a particularly obvious element, such as a large and vibrant visual element or a loud and easily detected noise in the case of audio production.
   3. Push the element backwards in the rendering logic one function at a time. When the obvious element is eliminating, this may imply an issue in the last functional step between the current location and the final render.
7. Rubber Ducking and Social Consultation
   1. Thinking of root causes involves an ideation process which can be difficult for a single person, particularly in a large idea space, or when the troubleshooting developer is stressed, tired, or in an unfamiliar code region.
   2. Talking to almost anyone can sometimes help trigger new thoughts, particularly if the person is technical.
   3. You can use a language model to help with this discussion and ideation process as well!
8. Test-Driven Debugging
   1. We can use automated tests to quickly change inputs and view the resulting behavior in a component, which can give insight into potential cases that are more or less suspect.
   2. We can also make changes to tests in order to improve the feedback loop speed of elimination-based debugging, instead of having to redeploy the application.
   3. Tests allow us to try many permutations by scripting, which can also help us cover more ground in a rapid fashion.
   4. When a test suite exists with high branch coverage, we can get even better insight into particular logical branches which may be problematic.
   5. If a region of code is weakly tested, implementing new tests can reveal misalignment between expected and actual behavior.
9. Type Checking. If a region of code is weakly typed, implementing stronger types can reveal misalignment between expected and actual behavior.
10. Data store interrogation. Review your database and application state. If there are instances of unexpected data, work backwards from where the data is saved to where the data is created and you may be able to identify a root cause of the problem.
11. Implementation from Scratch. Sometimes it's easier to build a system or subsystem from scratch, get it working properly, then compare it to the system under error.

## Commercial Patterns

These patterns overlap with previously mentioned categories, but they are particularly common in commercial settings and they have special names!

1. [Git Blame](https://git-scm.com/docs/git-blame) and [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) can help you identify technical subject matter experts that you can contact for help with particular concerns.
2. Health Checks
   1. These are functions that run periodically to verify the integrity of systems.
   2. They may be conducted as part of a batch process, streaming process, or by polling. This includes processes like [Kubernetes liveliness and readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).
   3. As a best practice, failing health checks are often paired with runbooks.
3. Commercial Logging and Correlation IDs
   1. Besides system logs, your company may have a commercial logger like [Datadog](https://www.datadoghq.com/), which may help track requests across various services, often correlated by a special ID called a correlation ID.
4. Observability and Telemetry
   1. Commercial loggers often capture telemetry data, but companies will have distinct tool for this.
   2. These tools may aide in the creation of dashboards, providing a place you can visit to easily see uptime, system health, and anomolous requests.
5. On-Call Alerts. These can be triggered for all sorts of reasons, such as failing health checks. They can be triggered by monitors set up in a telemetry tool. As a best practices, an on-call alert should be paired with recommended remediation activities. A common tool for this would be [PagerDuty](https://www.pagerduty.com/).
6. Enterprise documentation
   1. Knowledge stores like an enterprise [Confluence](https://www.atlassian.com/software/confluence/resources/guides/get-started/overview#hosting-options) instance or a similar tool may contain troubleshooting documentation.
   2. Sometimes these are outright equivalent to a runbook, though that term may not be used.
   3. If your company has an AI knowledge store like [Glean](https://www.glean.com/) or omni-search tool, prefer that over one-by-one inspection of disparete knowledge stores.
   4. Keep an eye out for incident creation material, in case you are dealing with a potentially high urgency or high criticality issue which your company may want turned in to a formal incident.
7. Chat Tools. Browsing and searching across messages and channels in a tool like an enterprise Slack often reveals useful information or human contacts.
8. Org Charts and Enterprise Social Tools can often yield relevant human contacts.
   1. You might be aware of a component name, then a team may be named off of that component, and a tool like an org chart might help you identify individual subject matter experts to assist with remediation of an issue in the related component.
   2. You can also inspect repository contributions and code owner files for the component under investigation.
   3. You can also look at editor name for document revisions in knowledge store entries related to the component under investigation, or people mentioned in relevant tickets in task tracking software.

## Coding Interview Debugging

We've covered many strategies, but most are not relevant in an interviewing context.

In an interview, prefer these techniques:

1. Write out pseudocode ahead of time. If you encounter an issue, try simply reading through the code line-by-line or simulating a test case with a mental debugger before writing any code.
2. If you step through and find mental debugging difficult, you can proceed to write some light code. A simple logger is typically your best tool in this case.
   1. Alternatively, sometimes an assertion-style expression can be a quick way to verify the code is working as expected up to a certain point.
3. In rare cases, it may be worth quickly writing a test case, if you are confident you can quickly write it down.
4. For frontend development in particular, it is fine to use an alert() call or visual element highlighting as appropriate.
