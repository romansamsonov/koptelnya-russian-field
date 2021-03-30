import express from 'express';
import log from 'fancy-log';
import ip from 'ip';

const initialize = () =>
{
    const devServer = express();
    devServer.use( express.static( './dist', {
        extensions : [ 'html' ]
    } ) );

    const listener = devServer.listen( 3000, () =>
    {
        log.info( 'App is running:' );
        log.info( `http://localhost:${listener.address().port}` );
        log.info(`http://${ip.address()}:${listener.address().port}`);
    } );
};

export default initialize;
