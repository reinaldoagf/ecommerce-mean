import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from "../../shared/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  serverErrorMessages: string;
  userDetails;
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res["user"];
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
