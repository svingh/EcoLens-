# EcoLens

## Developing with Docker

The project is set up as 3 separate docker containers (front end, back end, database).  You will need to [have docker installed](https://www.docker.com/products/docker-desktop/) and set up your development environment so that you can attach to a docker container and develop without having to constantly restart the container.

The Docker project provides a [list of IDEs that have docker extensions](https://www.docker.com/products/ide/)

## Build Tools

Gradle is the build tool used for the spring boot portions of this project. You can use gradle on the command line to perform build and testing tasks. You can also use it from within your IDE.  

Your team must choose a build tool to use with typescript. ESBuild is one of the recommended ones but you may choose a different one as long as the whole team uses the same tool.


## Branching and Merging

Pushes to the main branch are disabled. Developers should make a branch for the issue they are working on and merge the branch when the issue is complete. Merged branches may be deleted. A code review is required in order to merge a branch.

## Testing

Unit testing is required. As you add features, you must also add tests.

##  Deploy

You will deploy this project on your group's server. Sprints will be graded from the version on the server. You may not use the server for development. It is deployment only.   


