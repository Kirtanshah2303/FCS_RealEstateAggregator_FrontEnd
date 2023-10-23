import {useNavigate } from "react-router-dom"



const SaleProperty = () =>{
    const navigate = useNavigate();
    const AddProperty=() =>{
        navigate('/addProperty');
    };


    return (
        <div className="saleContainer">

            <div class="header">
                <h2>Sale Property Details</h2>
            </div>

            <div class="row">
                <div class="leftcolumn">
                    <div class="card">
                        <h2>Existing Property Details</h2>
                        {/* <h5>Title description, Dec 7, 2017</h5> */}
                        {/* <div class="fakeimg" style="height:200px;">Image</div> */}
                        <table>
                            <td>
                                <tr>Propert1</tr>
                                <tr>Propert1</tr>
                                <tr>Propert1</tr>
                                <tr>Propert1</tr>
                            </td>
                        </table>
                    </div>
                    {/* <div class="card">
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Sep 2, 2017</h5>
                        <div class="fakeimg" style="height:200px;">Image</div>
                        <p>Some text..</p>
                    </div> */}
                </div>
                <div class="rightcolumn">
                    <div class="card">
                        <button onClick={AddProperty}> Add Property
                            {/* <Link to="/addProperty">Add Property</Link> */}
                        </button>
                        {/* <h4>Add Property</h4> */}
                        {/* <div class="fakeimg" style="height:100px;">Image</div> */}
                        {/* <p>Some text about me in culpa qui officia deserunt mollit anim..</p> */}
                    </div>
                    <div class="card">
                        <h3>Popular Post</h3>
                        <div class="fakeimg">Add Contract</div><br/>
                        <div class="fakeimg">Delete</div><br/>
                        {/* <div class="fakeimg">Image</div> */}
                    </div>
                </div>
            </div>

            {/* <div class="footer">
                <h2>Footer</h2>
            </div> */}

        </div>

        
        
    )
}
export default SaleProperty