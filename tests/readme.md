# Web Toolkit Testing

This is a docker image containing phantomjs and resemblejs to capture
screenshots and compare them with expected values respectively.

## How to use
To use it locally run the Web Toolkit docker container:
`docker run [ -p 3000:3000 ] --name wtk wtk`

Build the image
`docker build -t wtk-test .`

Run the image and link it to the web toolkit container.
Make sure to specify the `BASE_URL` argument. The `--rm` flag automatically
removes the container once it exits. 
`docker run [--link={ wtk-container-name | wtk-container-id }:wtk] -e BASE_URL=http://wtk:3000/ [ --rm ] wtk-test`

You can also point the `BASE_URL` to your host and omit the link
to avoid rebuilding the Web Toolkit docker image. This depends on
how you setup docker. When using Docker in VirtualBox you
can usually access the host on the IP 10.0.2.2. 

## Expose results and diffs

Mount the correct volumes to expose results and the diffs in a shared volume.

For exposing them in the toolkit container use the following command:
`--volumes-from { wtk-container-name | wtk-container-id }`

If you're pointing towards your host use something like this:
`-v ~/some/local/dir:/usr/src/app/tests`

## Example commands

If you run the toolkit in a container with the name `wtk` you can use
the following command to run the tests towards that container and 
write the results inside it:
`docker run --link=wtk:wtk --volumes-from wtk -e BASE_URL=http://wtk:3000/ --rm wtk-test`

If you want to test the toolkit running on your host os use the 
command below. Make sure to adjust the host path of the volume as
well as IP and port where the toolkit runs.
`docker run -v ~/some/local/dir:/usr/src/app/tests -e BASE_URL=http://10.0.2.2:3000/ --rm wtk-test`
