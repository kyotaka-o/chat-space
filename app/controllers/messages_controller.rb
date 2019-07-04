class MessagesController < ApplicationController
  def index
  end
  def create
    @message = Messages.new(message_params)
    if @message.save
      redirect_to group_messages
    else
      flash.now[:alert] = "メッセージを入力してください。"
      render :index
    end
  end
  
  private
  def message_params

  end  
end
