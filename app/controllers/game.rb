get '/game' do
  @game = Game.new

  erb :game
end

get '/games' do
  @user = current_user
  p current_user.inspect
  current_user.inspect
end
