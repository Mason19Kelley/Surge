
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { AdminAPI } from '../../../api/AdminAPI';
import { UserTable } from '../../../models/userTable.model';



function EditUserModal(props: { closeModal: () => void; isModalOpen: boolean | undefined; selectedUser: UserTable | undefined }) {
  const [ loading, setLoading ] = useState(false);
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    if (props.isModalOpen) {
      setUserName(props.selectedUser?.username || "");
      setEmail(props.selectedUser?.email || "");
      setRole(props.selectedUser?.role || "");
    }
 }, [props.isModalOpen, props.selectedUser]);

  const closeModal = () => {
    props.closeModal()
  }

  const saveUser = () => {
    console.log(username)
    console.log(email)
    console.log(role)
    props.closeModal()
  }
  
  return (
    <Modal title="Edit User" open={props.isModalOpen} onCancel={props.closeModal}
      footer={[
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        <Button key="submit" className="save-button" loading={loading} onClick={saveUser}>
          Save
        </Button>
      </div>
    ]}>
        <div>
            <p>Username</p>
            <Input value={username} onChange={e => setUserName(e.target.value)}/>
        </div>
        <div>
            <p>Email</p>
            <Input value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
            <p>Role</p>
            <Select
                value={role}
                onChange={e => setRole(e)}
                style={{ width: "100%"}}
                options={[{value: "Administrator", label: "Administrator"}, { value: 'User', label: 'User' }]}
            />
        </div>
    </Modal>
    
  )
}

export default EditUserModal;
