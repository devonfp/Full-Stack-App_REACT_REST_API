//  Displays validation errors in a user-friendly manner
const ErrorsDisplay = ({ errors }) => {

    let errorsDisplay = null;

    if (errors.length) {
        console.log(errors);
        errorsDisplay = (
            <div>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
    return errorsDisplay;
}
export default ErrorsDisplay;