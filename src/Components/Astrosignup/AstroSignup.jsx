import React from "react";
import withHOC from "../../Common/HOC";
import "./astrosignup.module.css";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";

const AstroSignup = () => {
  return (
    <>
      <div className="Contact_Page_padding">
        <div className="container">
          <div className="card_section pb-5">
            <Card className="Card_shadow p-3 mt-5">
              <div className="text-center mt-5 mb-3">
                <h4> Edit Your Profile</h4>
              </div>
              <div>
                <div>
                  <input type="file" accept="image/*" style={{ display: "none" }} id="contained-button-file" />
                </div>
              </div>
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Display Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Display Name" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Real Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Real Name" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="text" className="form-control" name="email" placeholder="Email" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Mobile Number</label>
                        <input type="nember" className="form-control" name="number" placeholder="Number" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Alternative Mobile Number</label>
                        <input type="nember" className="form-control" name="number" placeholder="Alternative Mobile Number" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Date of Birth</label>
                        <input type="date" name="dob" max={new Date().toISOString().slice(0, 10)} className="form-control" placeholder="Enter DOB" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Gender</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1" name="gender">
                              <option value="Male">Male </option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Skills</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="text" name="dob" className="form-control" placeholder="skills" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Category</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="text" name="dob" className="form-control" placeholder="Category" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Are you working on any other online portal</label>
                        <div className="d-flex  mr-2">
                          <div class="form-check pr-2">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Portal Name</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="text" name="dob" className="form-control" placeholder="Enter the portal name here" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Monthly Earn from Astrologer</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="text" name="dob" className="form-control" placeholder="Enter monthly Income" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Experience</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="number" name="dob" className="form-control" placeholder="Experience" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Address</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="text" name="dob" className="form-control" placeholder="Present Address" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Select Language</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1" name="gender">
                              <option value="Hindi">Hindi </option>
                              <option value="English">English</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Select Country</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1" name="gender">
                              <option value="Hindi">India </option>
                              <option value="English">USA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Select State</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1" name="gender">
                              <option value="Hindi">Delhi </option>
                              <option value="English">Noida</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Select City</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <select className="form-control" id="exampleFormControlSelect1" name="gender">
                              <option value="Hindi">Noida </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Pincode</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="text" name="dob" className="form-control" placeholder="Pincode" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">PAN Card Number</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="number" name="dob" className="form-control" placeholder="PAN Card Number" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Aadhar Number</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="number" name="dob" className="form-control" placeholder="Aadhar Number" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">GST Number</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="number" name="dob" className="form-control" placeholder="Aadhar Number" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Aadhar Image</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="file" name="dob" className="form-control" placeholder="Aadhar Number" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">PAN Image</label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <input type="file" name="dob" className="form-control" placeholder="Aadhar Number" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Short Bio </label>
                        <div className="  mr-2">
                          <div className="form-group">
                            <textarea rows={3} type="text" name="dob" className="form-control" placeholder="Bio" />
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  {/* <Grid className="Component_main_grid"></Grid>
                  <Grid className="Component_main_grid"></Grid>
                  <Grid className="Component_main_grid">
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Time of Birth</label>
                        <input type="time" name="tob" className="form-control" placeholder="Enter Time" />
                      </div>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} className="p-1">
                      <div className="form-group">
                        <label for="exampleInputEmail1"></label>
                        <p className="note-text">
                          ⚠️Note: Please <span style={{ cursor: "pointer", color: "#0b16ed" }}>contact the Rakshaa support team</span> to update your
                          Mobile Number & Email ID.
                        </p>
                      </div>
                    </Grid>
                  </Grid> */}
                  <div className="text-center-button mt-1 ">
                    <button type="button" className="btn get_otp_btn_userprofile_btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default withHOC(AstroSignup);
