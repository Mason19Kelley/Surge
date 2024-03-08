
import { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';

function EditCourseModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; courseName: string | undefined; instructorName: string | undefined}) {
  const [ loading, setLoading ] = useState(false);
  const [CourseName, setCourseName] = useState("")
  const [instructorName, setinstructorName] = useState("")

  useEffect(() => {
    if (props.isModalOpen) {
        setCourseName(props.courseName || "");
        setinstructorName(props.instructorName || "");
    }
 }, [props.isModalOpen, props.courseName, props.instructorName]);

  const closeModal = () => {
    props.closeModal()
  }

  const saveCourseInformation = () => {
    props.closeModal()
  }

  return (
    <Modal title="Edit Course Information" open={props.isModalOpen} onCancel={props.closeModal}
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" className="save-button" loading={loading} onClick={saveCourseInformation} >
          Save
        </Button>
      </div>
    ]}>
        <div>
            <p>Course Name</p>
            <Input value={CourseName} onChange={e => setCourseName(e.target.value)}/>
        </div>
        <div>
            <p>Instructor</p>
            <Input value={instructorName} onChange={e => setinstructorName(e.target.value)}/>
        </div>
    </Modal>
  )
}

export default EditCourseModal;
