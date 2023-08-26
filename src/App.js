import './App.css';
import arrow from './assets/images/icon-arrow.svg';
import locationIcon from './assets/images/icon-location.svg';
import {useEffect, useState} from 'react';

function App() {
 const [search, setSearch] = useState('');

  const [ipAddress, setIpAddress] = useState('');
  const [geolocationData, setGeolocationData] = useState({});

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        // Fetch public IP address from ipify
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();

        setIpAddress(data.ip);

      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    const fetchGeolocationData = async () => {
      try {
        // Fetch geolocation data from ipinfo.io using the IP address
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ipAddress}`);

        const data = await response.json();

        setGeolocationData(data);
      } catch (error) {
        console.error('Error fetching geolocation data:', error);
      }
    };

    //check to make sure we dont call fetchGeolocationData(); function when the compont runs the first time
    if (ipAddress) {
      fetchGeolocationData();
    }
  }, [ipAddress]);

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value);
    
  }

    const handleSubmit = ()=> {
      console.log(search)
    }

  return (
    <>

     <div className='bg'>
     <h3>ip address tracker</h3>  
      <div className='center'>
     <input type='search' placeholder='search for any ip address or domain' onChange={handleChange} />
     <button onClick={handleSubmit}>
      <img src={arrow} alt='arrow-icon' className='btn-img' />
     </button>
      <div className='white-bg'>
          <div className='flex'>
            <div>
            <span>ip address</span>
            <h2>{geolocationData.ip}</h2>
            </div>
            <div className='bord'/>
            <div>
            <span>location</span>
            <h2>{`${geolocationData.location?.city}, ${ geolocationData.location?.region}. ${geolocationData.location?.country}`}</h2>
            </div>
            <div className='bord'/>
            <div>
            <span>timezone</span>
            <h2>{geolocationData.location?.timezone}</h2>
            </div>
            <div className='bord'/>
            <div>
            <span>isp</span>
            <h2>{geolocationData.isp}</h2>
            </div>
            
          </div>
      </div>
      </div>
     </div>

      {/* map section */}
        <div className='map'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193746.9954497879!2d-74.10980999780304!3d40.6453873708535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24416947c2109%3A0x82765c7404007886!2sBrooklyn%2C%20NY%2C%20USA!5e0!3m2!1sen!2sng!4v1688983402698!5m2!1sen!2sng" width="600" height="450" style={{border: 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <img className='icon' src={locationIcon} alt='location-icon'/>
    </>
  );
}

export default App;
