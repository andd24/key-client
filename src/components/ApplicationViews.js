import React from "react"
import { Route } from "react-router-dom"
import { AllProjects } from "./projects/AllProjects"
import { ProjectDetails } from "./projects/ProjectDetails"
import { ProjectDashboard } from "./projects/ProjectDashboard"
import { ProjectForm } from "./projects/ProjectForm"
import { Welcome } from "./Welcome"
import { InterviewForm } from "./interviews/InterviewForm"
import { PlannedInterview } from "./interviews/PlannedInterview"
import { UserProfile } from "./users/UserProfile"
import { InstitutionDetails } from "./institutions/InstitutionDetails"
import { EditInterviewForm } from "./interviews/EditInterviewForm"
import { QuestionForm } from "./questions/QuestionForm"
import { ConductInterviewForm } from "./interviews/ConductInterviewForm"
import { Project } from "./projects/Project"
import { FinalProject } from "./projects/FinalProject"
import { InterviewView } from "./interviews/InterviewView"
import { EditProject } from "./projects/EditProject"

export const ApplicationViews = () => {
  return (
    <>
    <Route exact path="/">
        <Welcome />
    </Route>
    <Route exact path="/projects">
        <ProjectDashboard />    
    </Route>
    <Route path="/browse">
        <AllProjects />
    </Route>
    <Route path="/projects/new">
        <ProjectForm />
    </Route>
    <Route exact path="/projects/:projectId(\d+)">
        <ProjectDetails />
    </Route>
    <Route path="/projects/new_interview/:projectId(\d+)">
        <InterviewForm />
    </Route>
    <Route exact path="/interviews/:interviewId(\d+)">
        <PlannedInterview />
    </Route>
    <Route exact path="/interviews/:interviewId(\d+)/complete">
        <InterviewView />
    </Route>
    <Route path="/profile/:userId(\d+)">
        <UserProfile />
    </Route>
    <Route path="/institutions/:institutionId(\d+)">
        <InstitutionDetails />
    </Route>
    <Route path="/interviews/:interviewId(\d+)/edit">
        <EditInterviewForm />
    </Route>
    <Route path="/projects/:projectId(\d+)/questions">
        <QuestionForm />
    </Route>
    <Route path="/interviews/:interviewId(\d+)/conduct">
        <ConductInterviewForm />
    </Route>
    <Route path="/projects/:projectId(\d+)/card">
        <Project />
    </Route>
    <Route path="/projects/:projectId(\d+)/full">
        <FinalProject />
    </Route>
    <Route path="/interviews/:interviewId(\d+)/view">
        <InterviewView />
    </Route>
    <Route path="/projects/:projectId(\d+)/edit">
        <EditProject />
    </Route>
    </>
  )
}