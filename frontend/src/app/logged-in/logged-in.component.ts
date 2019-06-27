import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logged-in",
  templateUrl: "./logged-in.component.html",
  styleUrls: ["./logged-in.component.css"]
})
export class LoggedInComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(["/login"]);
  }
}
