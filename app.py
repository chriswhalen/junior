from junior import Application, Bundle, join

app = Application()

app.assets.register('junior_js', Bundle(

    join('src', 'junior', 'scripts', '_core.js'),
    filters=('require', 'babel', 'rjsmin'),
    output=join('src', 'junior', 'scripts', 'junior.js')
))
