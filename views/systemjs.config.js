	/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'views/dist',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
		'dragula': 'node_modules/dragula',
		'ng2-dragula': 'node_modules/ng2-dragula',
		'contra': 'node_modules/contra',
		'atoa': 'node_modules/atoa',
		'ticky': 'node_modules/ticky',
		'crossvent': 'node_modules/crossvent/src',
		'custom-event': 'node_modules/custom-event',
		'ng2-datepicker': 'node_modules/ng2-datepicker',
		'ng2-slimscroll': 'node_modules/ng2-slimscroll',
		'moment': 'node_modules/moment',
		'ng2-datetime-picker': 'node_modules/ng2-datetime-picker/dist',
    'angular2-fullcalendar': 'angular2-fullcalendar/src/calendar',
		
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
	'dragula': {main: 'dragula.js', defaultExtension: 'js'},
	'ng2-dragula': {defaultExtension: 'js'},
	'contra': {main: 'contra.js', defaultExtension: 'js'},
	'atoa': {main: 'atoa.js', defaultExtension: 'js'},
	'ticky': {main: 'ticky.js', defaultExtension: 'js'},
	'crossvent': {main: 'crossvent.js', defaultExtension: 'js'},
	'custom-event': {main: 'index.js', defaultExtension: 'js'},
	'ng2-datepicker': {main: 'ng2-datepicker.js', defaultExtension: 'js'},
	'ng2-slimscroll': {main: 'ng2-slimscroll.js', defaultExtension: 'js'},
	'moment': {main: 'moment.js', defaultExtension: 'js'},
	'ng2-datetime-picker': {main: 'ng2-datetime-picker.umd.js', defaultExtension: 'js'},
  'angular2-fullcalendar': {main: 'calendar.js', defaultExtension: 'js'},
	  
    }	
	
  });
})(this);
