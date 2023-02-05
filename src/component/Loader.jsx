import '../css/loader.css';

const LoaderComponent = ({ size }) => {
    let wrapper = '';
    let loader = '';

    if (size === 'small') {
        wrapper = 'loaderWrapper';
        loader = 'loader';
    };
    
    if (size === 'medium') {
        wrapper = 'loaderMediumWrapper';
        loader = 'loaderMedium';
    };
    
    return (<div className={wrapper}>
        <div className={loader}>
            <div></div>
        </div>
    </div>)
};

export default LoaderComponent;