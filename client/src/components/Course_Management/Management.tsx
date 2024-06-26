import './Management.css';
import { Button, Card, Image, Tooltip, Typography } from 'antd';
import headerImg from '../../assets/Dashboard/DashboardHeader.png';
import { ThemeProvider } from '@mui/system';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CourseAPI } from '../../api/CourseAPI';
import { AuthContext } from '../../context/AuthContext';

interface course {
  courseName : string,
  modules :
      {
          moduleName : string,
          moduleID: string,
          content :
              {
                  contentType : string | null,
                  fileType : string | null,
                  fileName : string | null,
                  quizID : number | null,
                  Description : string | null
              }[]
      }[]
}

// Temporary course object to be used when creating a new course


// temporary course information to be used when creating a 
// new course
const tempCourse: course = {
  courseName: 'temp',
  modules: [
    ]
}



function Management () {
  const [courseList, setCourseList] = useState<string[]>([]);
  const { user, setEditCourseContext } = useContext(AuthContext);

  useEffect(() => {
    CourseAPI.getAllCourses(user?.organization?.id || 0).then((data: any[]) => {
      const names = data.map((course: {courseName: string}) => course.courseName);
      const sortedNames = names.sort((a, b) => a.localeCompare(b));
      setCourseList(sortedNames);

    });
  }, [])

  const navigate = useNavigate();

  // adds a course to the list of courses and adds to the database
  const addCourse = () => {
    const length = courseList.length + 1;
    var newCourse = 'Course ' + length;
    tempCourse.courseName = newCourse;
    setCourseList([...courseList, newCourse]);

    CourseAPI.insertCourse(newCourse, JSON.stringify(tempCourse), 'Instructor', user?.organization?.id)
  }

  // removes course from the list of courses and deletes from the database
  const removeCourse = (classtoRemove: string) => {
    CourseAPI.deleteCourse(classtoRemove);
    const updatedcoursesList = courseList.filter(item => item !== classtoRemove);
    setCourseList(updatedcoursesList);

  }

  // navigates to the edit course page
  const editCourse = (course: string) => {
    setEditCourseContext('Edit_Course');
    navigate(`/editCourse/${course}`);
  };
  
  // creates cards for each course and displays
  const cards = () => {
    return (
      <div className="flex flex-col gap-[1px]">
        {courseList.map((course) => (
        <div className='courses flex flex-row justify-between  w-[99%]'>
            <Card
            style={{ width: '100%', backgroundColor: '#D0E2F0', borderBlockWidth: '1vw', 
            borderBlockColor: '#B1D0E7', marginBottom: 10}}
            >
              <div className="flex flex-row justify-between">
                <Typography.Title level={3} style={{ textAlign: 'left' }}>
                  <div className='dashboardText'>{course}</div>
                </Typography.Title>
                <div style = {{display:'flex', gap: "2px"}}>
                  <Tooltip placement='bottom' title="Edit Course">
                  <Button className='noHover' type="primary" style={{ width: '50px', background: '#F34B4B' }} onClick={() => editCourse(course)} icon={<EditOutlined style={{ color: 'white' }} />}>
                  </Button>
                  </Tooltip>
                  <Tooltip placement='bottom' title="Delete Course">
                    <Button className='noHover' type="primary" style={{ width: '50px', background: '#F34B4B' }} onClick={() => removeCourse(course)} icon={<DeleteOutlined style={{ color: 'white' }} />}>
                    </Button>
                  </Tooltip>                  
                </div>
              </div>
            </Card>
        </div>
        ))}
      </div>
    );
  }


  return (
    <div className='cm-wrapper'>
      <div className='headerImage'>
        <Image
          width= '100%'
          height = '98%'
          src = {headerImg}
          preview = {false}
        />
      </div>
      <h1 className='self-start course-m pb-3' style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingTop: 10}}>Course Management</h1>
      <div className='courses ml-[1%] mr-[1%]'>
        <ThemeProvider theme={{ palette: {primary: {main: 'white'}}}}>
          <Card>
            <div className='flex flex-row justify-between'>
            <Typography.Title level={3} style={{ textAlign: 'left' }}>
              <div className='dashboardText'>Courses</div>
            </Typography.Title>
            <Tooltip placement='bottom' title="Create Course">
              <Button className='noHover' type="primary" style={{ width: '50px', background: '#F34B4B' }} onClick = {addCourse} icon={<PlusOutlined style={{ color: 'white' }} />}>
              </Button>
            </Tooltip>
            </div>
            <div>{cards()}</div>
          </Card>
          </ThemeProvider>
        </div>
    </div>
  )
}

export default Management;
