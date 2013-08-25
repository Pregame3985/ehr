class HrMailer < ActionMailer::Base
  default from: "hr@example.com"

  def interviewer_notification_email(notification_hash, receiver, job)
    @user = current_user
    @url  = "#{url_for(:only_path => false)}/#{notification_hash[:hash]}"
    mail(to: receiver, subject: "Here is new candidate for #{job.title} .")
  end

  def candidate_notification_email(candate, job)
    @user = current_user
    mail(to: receiver, subject: "Dear #{candate.name} We've got your resume for #{job.title}.")
  end

end
