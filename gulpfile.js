const gulp = require('gulp');
const replace = require('gulp-replace');
const svgInject = require('gulp-svg-inject');
const svgmin = require('gulp-svgmin');
const rename = require("gulp-rename");

gulp.task('default', ['watch']);

gulp.task('watch', function () {

    gulp.watch('src/svg-source/svg_exports/!*.svg', ['optimise-svgs']);
    gulp.watch('src/svg-source/svg_optimised/!*.svg', ['make-svgs-react-ready']);

    /*DECIDED it was safer to run these manually!*/
    /*gulp.watch('src/!*.svg', ['svg-convert-AND-optimise']);
    gulp.watch('src/svg__source/gallery*.svg', ['inject-svg-window-into-component']);
    gulp.watch('src/svg__source/window.svg', ['inject-svg-window-into-component']);
    gulp.watch('src/svg__source/!*Wall.svg', ['inject-svg-walls-into-components']);*/
});

// Gallery assets - generate optimised svgs
gulp.task('optimise-svgs', function () {
    gulp.src('src/svg-source/svg_exports/*.svg')
        .pipe(replace('xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"', ''))
        .pipe(replace(" xmlns=\"http://www.w3.org/2000/svg\"", ''))
        .pipe(replace(/mix-blend-mode:normal;isolation:auto/g, ''))
        .pipe(replace(/isolation:auto;mix-blend-mode:normal/g, ''))
        .pipe(replace(/ stroke-linejoin="round"/g, ''))
        .pipe(replace(/ stroke-linecap="round"/g, ''))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                cleanupIDs: {
                    remove: false
                }
            }]
        }))

        .pipe(gulp.dest('src/svg-source/svg_optimised/'));
});

gulp.task('make-svgs-react-ready', function () {
   gulp.src('src/svg-source/svg_optimised/*svg')
       .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
       .pipe(replace("font-size", 'fontSize'))
       .pipe(replace("font-family", 'fontFamily'))
       .pipe(replace("font-weight", 'fontWeight'))
       .pipe(replace("word-spacing", 'wordSpacing'))
       .pipe(replace("letter-spacing", 'letterSpacing'))
       .pipe(replace("text-anchor", 'textAnchor'))
       .pipe(replace("fill-opacity", 'fillOpacity'))
       .pipe(replace("stroke-opacity", 'strokeOpacity'))
       .pipe(replace("stroke-width", 'strokeWidth'))
       .pipe(replace("fill-rule", 'fillRule'))
       .pipe(replace("stroke-linejoin", 'strokeLinejoin'))
       .pipe(replace("viewbox", 'viewBox'))

       .pipe(gulp.dest('src/svg-source/svg_reactReady/'));
});



gulp.task('inject-svg-title-into-component', function () {
    gulp.src('src/svg-source/component_templates/SvgGalleryTitle__source.js')
        .pipe(svgInject())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace("__source", "");
        }))

        .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
        .pipe(replace("font-size", 'fontSize'))
        .pipe(replace("font-family", 'fontFamily'))
        .pipe(replace("font-weight", 'fontWeight'))
        .pipe(replace("word-spacing", 'wordSpacing'))
        .pipe(replace("letter-spacing", 'letterSpacing'))
        .pipe(replace("text-anchor", 'textAnchor'))
        .pipe(replace("fill-opacity", 'fillOpacity'))
        .pipe(replace("stroke-width", 'strokeWidth'))
        .pipe(replace("fill-rule", 'fillRule'))
        .pipe(replace("viewbox", 'viewBox'))

        .pipe(replace("Christopher", '{props.firstName}'))
        .pipe(replace("John Dennett", '{props.lastName}'))

        .pipe(gulp.dest('src/components/Gallery/assets/'));
});

gulp.task('inject-svg-bottom-into-components', function () {
    gulp.src('src/svg-source/component_templates/SvgGalleryBottom__source.js')
        .pipe(svgInject())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace("__source", "");
        }))

        .pipe(replace("<svg ", '<svg {...props} '))

        .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
        .pipe(replace("font-size", 'fontSize'))
        .pipe(replace("font-family", 'fontFamily'))
        .pipe(replace("font-weight", 'fontWeight'))
        .pipe(replace("word-spacing", 'wordSpacing'))
        .pipe(replace("letter-spacing", 'letterSpacing'))
        .pipe(replace("text-anchor", 'textAnchor'))
        .pipe(replace("fill-opacity", 'fillOpacity'))
        .pipe(replace("stroke-width", 'strokeWidth'))
        .pipe(replace("fill-rule", 'fillRule'))
        .pipe(replace("viewbox", 'viewBox'))

        .pipe(gulp.dest('src/components/Gallery/assets/'));
});

gulp.task('inject-svg-window-into-component', function () {
    gulp.src('src/svg-source/component_templates/svg__source/SvgWindow__source.js')
        .pipe(svgInject())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace("__source", "");
        }))

        .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
        .pipe(replace("font-size", 'fontSize'))
        .pipe(replace("font-family", 'fontFamily'))
        .pipe(replace("word-spacing", 'wordSpacing'))
        .pipe(replace("letter-spacing", 'letterSpacing'))
        .pipe(replace("text-anchor", 'textAnchor'))
        .pipe(replace("fill-opacity", 'fillOpacity'))
        .pipe(replace("stroke-width", 'strokeWidth'))
        .pipe(replace("fill-rule", 'fillRule'))
        .pipe(replace("viewbox", 'viewBox'))

        // .pipe(replace(/ width="[0-9.]*" viewBox="[[0-9. ]*"/, ''))
        .pipe(replace("<svg ", '<svg {...props} '))

        .pipe(gulp.dest('src/components/Gallery/assets/'));
});

/*gulp.task('inject-svg-title-into-component', function () {
    gulp.src('src/svg__source/SvgGalleryTitle__source.js')
        .pipe(svgInject())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace("__source", "");
        }))

        .pipe(replace("<svg ", '<svg {...props} '))

        .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
        .pipe(replace("font-size", 'fontSize'))
        .pipe(replace("font-family", 'fontFamily'))
        .pipe(replace("word-spacing", 'wordSpacing'))
        .pipe(replace("letter-spacing", 'letterSpacing'))
        .pipe(replace("text-anchor", 'textAnchor'))
        .pipe(replace("fill-opacity", 'fillOpacity'))
        .pipe(replace("stroke-width", 'strokeWidth'))
        .pipe(replace("fill-rule", 'fillRule'))
        .pipe(replace("viewbox", 'viewBox'))

        .pipe(gulp.dest('src/gallery/'));
});

gulp.task('inject-svg-window-into-component', function () {
    gulp.src('src/svg__source/SvgWindow__source.js')
        .pipe(svgInject())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace("__source", "");
        }))

        .pipe(replace("<svg ", '<svg {...props} '))

        .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
        .pipe(replace("font-size", 'fontSize'))
        .pipe(replace("font-family", 'fontFamily'))
        .pipe(replace("word-spacing", 'wordSpacing'))
        .pipe(replace("letter-spacing", 'letterSpacing'))
        .pipe(replace("text-anchor", 'textAnchor'))
        .pipe(replace("fill-opacity", 'fillOpacity'))
        .pipe(replace("stroke-width", 'strokeWidth'))
        .pipe(replace("fill-rule", 'fillRule'))
        .pipe(replace("viewbox", 'viewBox'))

        .pipe(gulp.dest('src/gallery/'));
});

gulp.task('inject-svg-bottom-into-component', function () {
    gulp.src('src/svg__source/SvgGalleryBottom__source.js')
        .pipe(svgInject())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace("__source", "");
        }))

        .pipe(replace("<svg ", '<svg {...props} '))

        .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
        .pipe(replace("font-size", 'fontSize'))
        .pipe(replace("font-family", 'fontFamily'))
        .pipe(replace("word-spacing", 'wordSpacing'))
        .pipe(replace("letter-spacing", 'letterSpacing'))
        .pipe(replace("text-anchor", 'textAnchor'))
        .pipe(replace("fill-opacity", 'fillOpacity'))
        .pipe(replace("stroke-width", 'strokeWidth'))
        .pipe(replace("fill-rule", 'fillRule'))
        .pipe(replace("viewbox", 'viewBox'))

        .pipe(gulp.dest('src/gallery/'));
});*/

gulp.task('inject-svg-walls-into-components', function () {
    gulp.src('src/svg-source/component_templates/*Wall__source.js')

        .pipe(svgInject())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace("__source", "");
        }))

        .pipe(replace(/<svg[^>]*>/, ''))
        .pipe(replace("</svg>", ''))

        .pipe(replace("style=\"text-align:center\"", 'style={{textAlign:"center"}}'))
        .pipe(replace("font-size", 'fontSize'))
        .pipe(replace("font-family", 'fontFamily'))
        .pipe(replace("word-spacing", 'wordSpacing'))
        .pipe(replace("letter-spacing", 'letterSpacing'))
        .pipe(replace("text-anchor", 'textAnchor'))
        .pipe(replace("fill-opacity", 'fillOpacity'))
        .pipe(replace("stroke-width", 'strokeWidth'))
        .pipe(replace("fill-rule", 'fillRule'))
        .pipe(replace("viewbox", 'viewBox'))

        .pipe(replace("changeme", 'svg'))


        .pipe(gulp.dest('src/components/Gallery/assets/'));
});