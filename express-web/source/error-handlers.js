export function mainErrorHandler(err, req, res, next) {
    if (err.statusCode == 404 || err.statusCode == 413) {
        let message;
        let errHeader;
        res.status(err.statusCode);
        switch(err.statusCode) {
            case 404:
                message = err.message;
                errHeader = 'WTF?!';
                break;
            case 413:
                message = 'Передано слишком много данных';
                errHeader = 'хватит...';
               
                break;
        }
        res.render('errors/error', {
            title:'Ошибка',
            message: message,
            errHeader: errHeader

        });
    } else
        next (err);
}

export function error500Handler( err, req, res, next) {
    res.status(500);
    res.render('errors/500', {
        title: "Ошибка",
        err: err
    });
}