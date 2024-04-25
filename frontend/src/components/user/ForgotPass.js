import React from 'react'

function ForgotPass() {
    return (
        <div className='forCenter'>
            <div className='mt-3'>
                <img src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png" alt="" />
            </div>
            <div className='mt-4 forgotPass'>
                <h3>Password assistance</h3>
                <p className='small'>Please enter the email address associated with your AKSHAt account.</p>

                <form>
                    <label className='small fw-bold'>Email</label>
                    <input type="email" className='form-control' />
                    <button type='submit' className='form-control'>Continue</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass
