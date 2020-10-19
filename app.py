from junior import Application, Bundle, join

application = Application()

application.assets.register('junior_js', Bundle(

    join('scripts', 'junior.js'),
    filters=('require', 'rjsmin'),
    output=join('src', 'junior', 'scripts', 'junior.js')
))
