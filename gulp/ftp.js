const path = require('./path/path.js');

module.exports = function () {
	$.gulp.task('ftp:build', done => {
		if ($.yargs.ftp) {
			let conn = $.vinylFtp.create({
				host: '192.168.0.193',
				user: 'ftp',
				password: 'ftp',
				parallel: 10
			})

			let globs = [
				`${path.path.build.root}**/!(*.html)` // Все файлы, кроме *.html
			];

			// using base = '.' will transfer everything to /public_html correctly
			// turn off buffering in gulp.src for best performance

			return $.gulp.src(globs, {
				base: 'dist/',
				buffer: false
			})
				.pipe(conn.newer('.')) // only upload newer files
				.pipe(conn.dest('.'))
		}
		done()
	})
}
