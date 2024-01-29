import { Box } from '@mui/system';
import './Courses.css'
import { Card } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'
import { CourseAPI } from '../../api/CourseAPI';

const { Meta } = Card;

interface CardProps {
  courseName?: string;
  instructor?: string;
}

// Generating the card
function generateCard({courseName, instructor}: CardProps) {
  // Template for the image on the top of the card
  const boxTemplate = {
    width: 1,
    height:147,
    borderRadius: 1,
    bgcolor: 'gray'
  };

  // Building the Actual card, obtaining the name and instructor
  return (
    <Card style={{ width: 300 }} cover={ <Box sx={ boxTemplate }/> }>
      <Meta title = { courseName } description= { instructor }/>
    </Card>
  );
}


const Courses: React.FC = () => {
  const ids = CourseAPI.getCourses(1)
  console.log(ids)

  return (
  <div className='testcard'>
    
  </div> 
  );
};
  
export default Courses;