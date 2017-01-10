rebuild_jekyll:
	git commit --allow-empty -m"Trigger Jekyll rebuild"
	git push

clean:
	rm -rf _site/

build: ~/.cspca.crt
	# Requires the CSP certificate file obtained from:
	# https://access.llnl.gov/cspca.cer
	SSL_CERT_FILE=~/.cspca.crt bundle exec jekyll build

deploy: clean build
	chmod -R ugo+rX _site/
	rsync -avz --delete _site/ timbl:/export/www/software-pre/html/
