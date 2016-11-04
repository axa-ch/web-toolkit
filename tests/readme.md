# Web Toolkit Testing

This is a docker image containing phantomjs and resemblejs to capture
screenshots and compare them with expected values respecitely.

## How to use
To use it locally run the Web Toolkit docker container:
`docker run --name wtk wtk`

Build the image
`docker build -t wtk-test .`

Run the image and link it to the web toolkit container.
Make sure to specify the `BASE_URL` argument. The `--rm` flag automatically
removes the container once it exits. 
`docker run [--link={ wtk-container-name | wtk-container-id }:wtk] -e BASE_URL=http://wtk:3000/ --rm wtk-test`

You can also point the `BASE_URL` to your host and omit the link
to avoid rebuilding the Web Toolkit docker image. This depends on
how you setup docker.

## Expose results and diffs

Add the following argument to the docker run command to
expose the diffs in a shared volume: