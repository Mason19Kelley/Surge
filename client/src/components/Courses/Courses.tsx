import { Box } from '@mui/system';
import './Courses.css'
import { Card } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'

const { Meta } = Card;

// Template for the image on the top of the card
const boxTemplate = {
  width: 1,
  height:147,
  borderRadius: 1,
  bgcolor: 'gray'
};

const Courses: React.FC = () => {
  const { user } = useContext(AuthContext)
  const { courses } = user || {}
  const { courseName, instructor } = courses || {}

  return (
  <div className='testcard'>
    <Card
      style={{ width: 300 }}
      cover={
        <Box sx={ boxTemplate }/>
      }
    >
      <Meta
        title = { courseName }
        description= { instructor }
      />
    </Card>
  </div> 
  );
};
  
export default Courses;