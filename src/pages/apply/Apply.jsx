import React, {useState} from 'react'
import applyImage from '../../assets/images/apply.png';
import axios from 'axios'
import './apply.css'
import Loader from '../../components/loader/Loader';

export default function Apply() {

    const [tenure, setTenure] = useState(5)
    const [loading, setLoading] = useState(false)
    const [appId, setAppId] = useState(null)

    function submitForm(e) {
        e.preventDefault();

        const form = e.target;

        // Get values
        const firstName = form.fName.value.trim();
        const lastName = form.lName.value.trim();
        const email = form.email.value.trim();
        const phoneNo = form.phoneNo.value.trim();
        const permanentAddress = form.pAddress.value.trim();
        const communicationAddress = form.cAddress.value.trim();
        const pancardNo = form.panNo.value.trim();
        const occupation = form.occupation.value;
        const monthlySalary = form.mSalary.value.trim();
        const loanAmount = form.loanAmount.value.trim();
        const loanInterest = form.loanType.value;
        const panCardFile = form['pan-upload'].files[0];
        const salarySlipFile = form['salary-upload'].files[0];

        // Check if any field is empty
        if (
            !firstName ||
            !lastName ||
            !email ||
            !phoneNo ||
            !permanentAddress ||
            !communicationAddress ||
            !pancardNo ||
            !occupation ||
            !monthlySalary ||
            !loanAmount ||
            !loanInterest ||
            !panCardFile ||
            !salarySlipFile
        ) {
            alert("All fields are required. Please fill in all the fields.");
            return;
        }

        // Validate phone number length (10 digits)
        if (phoneNo.length !== 10 || !/^\d{10}$/.test(phoneNo)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        const userDetails = {
            firstName,
            lastName,
            email,
            permanentAddress,
            communicationAddress,
            pancardNo,
            phoneNo,
            occupation,
            monthlySalary: Number(monthlySalary),
            loanAmount: Number(loanAmount),
            loanInterest: parseFloat(loanInterest),
            loanTenureMonths: parseInt(tenure) * 12,
        };

        const formData = new FormData();
        formData.append('userDetails', new Blob([JSON.stringify(userDetails)], { type: 'application/json' }));
        formData.append('pancard', panCardFile);
        formData.append('salarySlip', salarySlipFile);

        setLoading(true)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/loan/apply`, formData)
        .then((res) => {
            setLoading(false)
            if (res.data.success === true) {
                setAppId(res.data.result)
            } else {
                alert(res.data.errorMessage);
            }
        })
        .catch((err) => {
            setLoading(false)
            console.error(err);
            alert('Submission failed. Please try again.');
        });
    }

    function closePopup(){
        setAppId(null)
        window.location.reload()
    }

  return (
    <main class="apply-section">
        {
            loading?
            <Loader />
            :null
        }
        {
            appId===null?null:
            <div className='loaderDiv'>
                <div className='popupDiv'>
                    <p className='popupDivText'>Your Application Id is <span className='fetchedAppId'>{appId}</span>. Keep it for future reference. You can track your application using this Id.</p>
                    <div className='popupCloseButtonDiv'>
                        <button className='popupCloseButton' onClick={closePopup}>Close</button>
                    </div>
                </div>
            </div>
        }
        <div class="form-container">
        <h1>Apply for Application</h1>

        <form onSubmit={submitForm}>
            <label htmlFor="name">First Name</label>
            <input type="text" id="fName" placeholder="Enter your first name" required />

            <label htmlFor="name">Last Name</label>
            <input type="text" id="lName" placeholder="Enter your last name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />

            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phoneNo" placeholder="Enter your phone number" minLength={10} maxLength={10} required />

            <label htmlFor="name">Permanent Address</label>
            <input type="text" id="pAddress" placeholder="Enter your permanent address" required />

            <label htmlFor="name">Communication Address</label>
            <input type="text" id="cAddress" placeholder="Enter your communication address" required />

            <label htmlFor="name">PAN Card No</label>
            <input type="text" id="panNo" placeholder="Enter your pan card no" required />

            <label htmlFor="name">Occupation</label>
            <select id='occupation' defaultValue={'salaried'}>
                <option value={'businessOwner'}>Business Owner</option>
                <option value={'govermentEmployee'}>Goverment Employee</option>
                <option value={'salaried'}>Salaried</option>
                <option value={'retired'}>Retired</option>
            </select>

            <label htmlFor="name">Monthly Salary</label>
            <input type="text" id="mSalary" placeholder="Enter your monthly salary in INR" required />

            <label htmlFor="name">Loan Type</label>
            <select id='loanType' defaultValue={'personal'}>
                <option value={15}>Personal Loan</option>
                <option value={10}>Education Loan</option>
                <option value={9}>Home Loan</option>
                <option value={8}>Car Loan</option>
            </select>

            <label htmlFor="name">Loan Amount</label>
            <input type="text" id="loanAmount" placeholder="Enter your loan amount in INR" required />

            <label htmlFor="name">Loan Tenure In Years ({tenure} years)</label>
            <input type='range'id="loanTenure" min={1} max={25} defaultValue={tenure} onChange={(e)=>setTenure(e.target.value)}/>

            <div class="upload-container">
            <div class="upload-field">
                <label htmlFor="pan-upload">Upload PAN Card</label>
                <input type="file" id="pan-upload" accept=".pdf" />
            </div>
            <div class="upload-field">
                <label htmlFor="salary-upload">Upload Salary Slip</label>
                <input type="file" id="salary-upload" accept=".pdf" />
            </div>
            </div>

            <button type="submit" class="submit-btn">Submit Application</button>
        </form>
        </div>
        <div class="illustration">
            <img src={applyImage} alt="Illustration" />
        </div>
    </main>
  )
}
